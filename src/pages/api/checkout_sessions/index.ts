import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { config } from 'config';
import { formatDollarUS, parseJSON } from "core/helpers";
import { ICustomer } from "types/customer";
import { IToken } from "types/token";
import { verifyToken } from "lib/jwt";
import { Stripe } from "stripe";
import Address from "lib/models/Address";
import { countriesData } from "assets/data/Country";
import db from "lib/db";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc<NextApiRequest, NextApiResponse>();

interface MyCustomerRequest extends NextApiRequest {
  customer?: ICustomer;
}

handler.post(async (req, res) => {
  try {
    const { authorization } = req.headers;
    let dataToken;
    if (authorization) {
      const authData = authorization?.replace('Bearer ', '');
      const { token } = parseJSON<IToken>(authData)
      dataToken = await verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    }

    const cart = req.body
    let address;

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      line_items: cart.map((product) => {
        console.log('dauphaihau debug: product', product)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [config.hostStaticSource + product.images[0]],
              metadata: {
                productId: product._id
              },
            },
            // with USD, stripe use cents ( e.g: $1000 -> $10.00 )
            unit_amount: product?.salePrice ? product.salePrice * 100 : product.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            // minimum: 1,
            maximum: product.max_quantity
          },
          quantity: product.quantity,
        };
      }),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 15 * 100, currency: 'usd' },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 1 },
            },
          },
        },
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
    }

    // Guest User
    if (!dataToken) {
      params.shipping_address_collection = { allowed_countries: ['US', 'CA', 'AU', 'IT', 'JP', 'SG', 'FR', 'DE', 'GB'] }
      params.phone_number_collection = { enabled: true }
    }

    // Registered user
    if (dataToken) {
      params.customer_email = dataToken?.email ?? ''
      params.payment_intent_data = {
        metadata: {
          customerId: dataToken?.id ?? '',
        }
      }

      await db.connect();
      address = await Address.findOne({ customerId: dataToken.id, isPrimary: true })
      console.log('dauphaihau debug: address', address)
      await db.disconnect();

      if (address) {
        // auto prefill shipping address
        const data = countriesData.list.find(item => item.numberCode === address.countryCode)
        params.payment_intent_data = {
          shipping: {
            "name": address.name,
            "address": {
              "country": data.country,
              "state": address.state,
              "city": address.city,
              "line1": address.address1,
              "line2": address.address2 ?? '',
              "postal_code": address.zipCode
            }
          }
        }
      } else {
        params.phone_number_collection = { enabled: true }
        params.shipping_address_collection = { allowed_countries: ['US', 'CA', 'AU', 'IT', 'JP', 'SG', 'FR', 'DE', 'GB'] }
      }
    }

    console.log('dauphaihau debug: params', params)
    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json(session);
    // res.redirect(303, session.url);
  } catch (err) {
    console.log('dauphaihau debug: err', err)
    res.status(err.statusCode || 500).json(err.message);
  }
});

export default handler;

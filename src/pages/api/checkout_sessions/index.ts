import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { config } from 'config';
import { parseJSON } from "core/helpers";
import { ICustomer, IToken } from "types/customer";
import { verifyToken } from "lib/jwt";
import { Stripe } from "stripe";

// import { stripe } from "lib/stripe";
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
      // console.log('dauphaihau debug: authorization', authorization)
      const authData = authorization?.replace('Bearer ', '');
      // console.log('dauphaihau debug: auth-data', authData)
      const { token } = parseJSON<IToken>(authData)
      dataToken = await verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    }

    const cart = req.body
    // const line_items = cart.map(item => item._id)

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      customer_email: dataToken?.email ?? '',
      line_items: cart.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [config.hostStaticSource + product.images[0]],
            },
            unit_amount: product.price,
            // unit_amount: product.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: product.quantity,
        };
      }),
      metadata: {
        customerId: dataToken?.id ?? '',
        // line_items: JSON.stringify(line_items)
      },
      payment_intent_data: {
        metadata: {
          customerId: dataToken?.id ?? '',
          // line_items: JSON.stringify(line_items)
        }
      },
      // success_url: `${req.headers.origin}/?success`,
      // cancel_url: `${req.headers.origin}/?canceled`,
      success_url: `${req.headers.origin}/?success`,
      cancel_url: `${req.headers.origin}/`,
    }

    if (!dataToken) {
      delete params.metadata.customerId
      delete params.customer_email
    }

    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json(session);
    // res.redirect(303, session.url);
  } catch (err) {
    console.log('dauphaihau debug: err', err)
    res.status(err.statusCode || 500).json(err.message);
  }
});

export default handler;

import { NextApiRequest, NextApiResponse } from "next"
import rawBody from "raw-body"
import bcrypt from 'bcryptjs';
import Stripe from "stripe";
import crypto from "crypto";

import { stripe } from "lib/stripe"
import Order from "lib/models/Order";
import { isEmptyObject, isFalsy } from "core/helpers";
import { ROLE, USER_STATUS } from "config/const";
import Customer from "lib/models/Customer";
import { sendSetPassword } from "lib/mailer";
import Token from "lib/models/Token";
import { config as configJSON } from "config";
import Address from "lib/models/Address";
import db from "lib/db";

export const config = {
  api: {
    // Turn off the body parser, so we can access raw body for verification.
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const sig = req.headers['stripe-signature'];
  const body = await rawBody(req)
  let event;

  try {
    // event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET_LOCAL);
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const handleCustomerNotExist = async (customerRequest) => {
    const { address, name, email, phone } = customerRequest
    const customer = await new Customer({
      name, email, phone,
      role: ROLE.ACCOUNT,
      status: USER_STATUS.NOT_ACTIVATED
    }).save();

    const token = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(token, configJSON.bcryptSalt);
    await sendSetPassword({ toCustomer: customer, token });

    await new Token({
      customerId: customer._id,
      token: hash,
    }).save();
    return customer
  }

  const handleCreateOrUpdateOrder = async (stripeCustomerId, update, key) => {
    const filter = { stripeCustomerId }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await Order.findOneAndUpdate(filter, update, options).then((result) => {
       console.log(`dauphaihau debug: result execute on ${key}`, result)
    }, (error) => {
      console.log('dauphaihau debug: error', error)
    })
  }


  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      // console.log('dauphaihau debug: payment-intent', paymentIntent)
      break;

    case 'charge.succeeded': {
      const charge: Stripe.Charge = event.data.object;
      const { address, name, email, phone } = charge.billing_details
      console.log('dauphaihau debug: charge', charge)

      // 1. create or update order by stripeCustomerId ( handle case checkout session run before charge event or reverse)
      await handleCreateOrUpdateOrder(charge.customer, { stripeChargeId: charge.id }, 'charge')


      // customer payment without login

      // 2. case customer registered ( exists in db )
      let customer = await Customer.findOne({ email })
      console.log('dauphaihau debug: customer at charge success', customer)

      if (isEmptyObject(customer)) {
        console.log('dauphaihau debug: charge run case create customer')
        customer = await handleCustomerNotExist(charge.billing_details)
        console.log('dauphaihau debug: customer', customer)
      }


      // // address
      // await new Address({
      //   ...address,
      //   name,
      //   customerId: charge.metadata?.customerId ?? customer.id,
      //   countryCode: address.country,
      //   address1: address.line1,
      //   address2: address.line2,
      //   postalCode: address.postal_code,
      //   phone,
      // }).save();

      const updateCharge = await stripe.charges.update(
        charge.id,
        {
          metadata: {
            customerId: customer.id,
          }
        }
      );
      console.log('dauphaihau debug: update-charge', updateCharge)

      // const { address, name, email, phone } = charge.billing_details
      //
      // const newOrder = {
      //   customerId: charge.metadata?.customerId,
      //   stripeChargeId: charge.id,
      //   stripeCustomerId: charge.customer,
      // }
      //
      //
      // // user without login
      // // const newCustomer = {
      // //   // name, email, password,
      // //   name, email,
      // //   role: ROLE.ACCOUNT,
      // //   status: USER_STATUS.NOT_ACTIVATED
      // // }
      // // // new Customer(newCustomer).save();
      // // const customer = await new Customer(newCustomer).save();
      // // const token = await Token.findOne({ customerId: customer._id });
      // // if (token) await token.deleteOne();
      // //
      // // const resetToken = crypto.randomBytes(32).toString('hex');
      // // const hash = await bcrypt.hash(resetToken, configJSON.bcryptSalt);
      // // await sendSetPassword({ toCustomer: customer, token: resetToken });
      // //
      // // await new Token({
      // //   customerId: customer._id,
      // //   token: hash,
      // // }).save();
      //
      // /*
      //   case: if customer doesn't log in or register ( not exist in db ),
      //   only fill info in stripe page
      //  */
      // if (isFalsy(charge.metadata.customerId)) {
      //   delete newOrder.customerId
      // }
      //
      // console.log('dauphaihau debug: new-order', newOrder)
      // await new Order(newOrder).save()
    }
      break

    case 'checkout.session.completed': {
      const session: Stripe.Checkout.Session = event.data.object;
      const { address, name, email, phone } = session.customer_details
      console.log('dauphaihau debug: session', session)

      // // 1a. check metadata ( case charge before checkout session event ) -> update
      // // goal: save checkSessionId into db via stripeCustomerId
      // if (!isFalsy(session.metadata?.customerId)) {
      //   console.log('dauphaihau debug: checkout session run case update order')
      //   const { customerId } = session.metadata
      //
      //   // const filterAddress = { customerId }
      //   // const updateAddress = { isPrimary: false }
      //   // const isExist = await Address.findOne({ customerId, isPrimary: true })
      //   // if (!isExist) {
      //   //   const data = {
      //   //     ...address,
      //   //     countryCode: address.country,
      //   //     address1: address.line1,
      //   //     address2: address.line2,
      //   //     postalCode: address.postal_code,
      //   //     phone, customerId
      //   //   }
      //   //   new Address(data).save();
      //   // }
      //
      //   const filter = { stripeCustomerId: session.customer }
      //   const update = { stripeCheckoutSessionId: session.id }
      //   await Order.findOneAndUpdate(filter, update)
      //   return
      // }

      // console.log('dauphaihau debug: session checkout run case create')

      // 2. case customer registered ( exists in db ),
      await db.connect();
      let customer = await Customer.findOne({ email })
      console.log('dauphaihau debug: customer', customer)

      if (isEmptyObject(customer)) {
        console.log('dauphaihau debug: checkout session run case create customer')
        customer = await handleCustomerNotExist(session.customer_details)
      }

      await handleCreateOrUpdateOrder(session.customer, { stripeCheckoutSessionId: session.id }, 'checkout session')


      // create new address if user haven't primary address
      const filterAddress = { customerId: session.customer }
      const isExistAddress = await Address.findOne({ filterAddress, isPrimary: true })
      console.log('dauphaihau debug: is-exist-address', isExistAddress)
      if (!isExistAddress) {
        await new Address({
          ...address,
          name, phone,
          customerId: customer.id,
          // customerId: session.metadata?.customerId ?? customer.id,
          countryCode: address.country,
          address1: address.line1,
          address2: address.line2,
          postalCode: address.postal_code,
        }).save().then((savedAddress) => {
          console.log('dauphaihau debug: saved-address', savedAddress)
        }, (error) => {
          console.log('dauphaihau debug: error-save-address', error)
        })
      }


      await db.disconnect();
    }
      break

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

// Return a 200 res to acknowledge receipt of the event
  res.send(200);

}

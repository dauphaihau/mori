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
import db from "../../../lib/db";

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




  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      // console.log('dauphaihau debug: payment-intent', paymentIntent)
      break;

    case 'charge.succeeded': {
      const charge: Stripe.Charge = event.data.object;
      console.log('dauphaihau debug: charge', charge)

      const { address, name, email, phone } = charge.billing_details

      // 1a. check metadata ( case checkout session before charge event ) -> update
      if (!isFalsy(charge.metadata?.customerId)) {
        const filter = { stripeCustomerId: charge.customer }
        const update = { stripeChargeId: charge.id }
        await Order.findOneAndUpdate(filter, update)
        return
      }

      // 1b. check metadata ( case charge before checkout session ) -> create
      // customer payment without login

      // 2. case customer registered ( exists in db ),
      let customer = await Customer.findOne({ email })
      console.log('dauphaihau debug: customer', customer)

      if (isEmptyObject(customer)) {
        console.log('dauphaihau debug: charge run case create customer')
        customer = await handleCustomerNotExist(charge.billing_details)
        console.log('dauphaihau debug: customer', customer)
      }

      console.log('dauphaihau debug: charge-metadata-customer-id-customer-id', charge.metadata?.customerId ?? customer.id)

      // order
      await new Order({
        customerId: charge.metadata?.customerId ?? customer.id,
        // customerId: charge.metadata?.customerId,
        stripeChargeId: charge.id,
        stripeCustomerId: charge.customer,
      }).save()

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
        { metadata: { customerId: charge.metadata?.customerId ?? customer.id } }
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
      // console.log('dauphaihau debug: session', session)
      //
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
      //
      // console.log('dauphaihau debug: session checkout run case create')

      // 2. case customer registered ( exists in db ),
      await db.connect();
      let customer = await Customer.findOne({ email })
      console.log('dauphaihau debug: customer', customer)

      if (isEmptyObject(customer)) {
        console.log('dauphaihau debug: checkout session run case create customer')
        customer = await handleCustomerNotExist(session.customer_details)
        const updateCharge = await stripe.charges.update(
          session.id,
          { metadata: { customerId: customer.id } }
        );
        console.log('dauphaihau debug: update-charge', updateCharge)
      }



      const newOrder = {
        // customerId: session.metadata?.customerId,
        customerId: customer.id,
        stripeCustomerId: session.customer,
        stripeChargeId: session.id,
      }

      console.log('dauphaihau debug: new-order', newOrder)
      await new Order(newOrder).save()


      // let customer = await Customer.findOne({ email })
      // customer = await Customer.findOne({ email })

      // address
      await new Address({
        ...address,
        name, phone,
        customerId: session.metadata?.customerId ?? customer.id,
        countryCode: address.country,
        address1: address.line1,
        address2: address.line2,
        postalCode: address.postal_code,
      }).save();


      const filter = { stripeCustomerId: session.customer }
      const update = { stripeCheckoutSessionId: session.id }
      await Order.findOneAndUpdate(filter, update)

      await db.disconnect();
    }
      break

    case 'invoice.created':
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

// Return a 200 res to acknowledge receipt of the event
  res.send(200);

}

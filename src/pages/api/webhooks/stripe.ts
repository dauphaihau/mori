import { NextApiRequest, NextApiResponse } from "next"
import rawBody from "raw-body"

import { stripe } from "lib/stripe"
import Order from "lib/models/Order";
import { isFalsy } from "core/helpers";
import Stripe from "stripe";

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
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent: Stripe.PaymentIntent = event.data.object;
      // console.log('dauphaihau debug: payment-intent', paymentIntent)
      break;
    case 'charge.succeeded':
      const charge: Stripe.Charge = event.data.object;
      console.log('dauphaihau debug: charge', charge)

      const newOrder = {
        customerId: charge.metadata?.customerId,
        stripeChargeId: charge.id,
        stripeCustomerId: charge.customer,
      }

      /*
        case: if customer doesn't log in or register ( not exist in db ),
        only fill info in stripe page
       */
      if (isFalsy(charge.metadata.customerId)) {
        delete newOrder.customerId
      }

      console.log('dauphaihau debug: new-order', newOrder)
      await new Order(newOrder).save()
      break
    case 'checkout.session.completed':
      const session: Stripe.Checkout.Session = event.data.object;
      console.log('dauphaihau debug: session', event.data.object)

      const filter = { stripeCustomerId: session.customer }
      const update = { stripeCheckoutSessionId: session.id }
      await Order.findOneAndUpdate(filter, update)
      break


    // case 'invoice.created':
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send(200);

}

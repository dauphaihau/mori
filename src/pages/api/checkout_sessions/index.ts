import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { config } from 'config';

// import * as Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc<NextApiRequest, NextApiResponse>();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cart = req.body
    const params = {
      submit_type: "pay",
      mode: "payment",
      line_items: cart.map((product) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                images: [config.hostStaticSource + product.images[0]],
              },
              unit_amount: product.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: product.quantity,

          };
        },
      ),
      success_url: `${req.headers.origin}/?success`,
      cancel_url: `${req.headers.origin}/?canceled`,
    }
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session);
    // res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

export default handler;

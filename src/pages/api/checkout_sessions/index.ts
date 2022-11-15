import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
// import * as Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('dauphaihau debug: req-body', req.body)
  try {
    // Create Checkout Sessions from body params.
    const params = {
      submit_type: "pay",
      mode: "payment",
      line_items: req.body.map((item) => {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          // price: process.env.PRICE_ID,
          //   quantity: 1,
          //   adjustable_quantity: {
          //   enabled: true,
          //     minimum: 1,
          // },

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                // images: [newImage],
                images: ['https://res.cloudinary.com/duiehrbms/image/upload/v1668264431/mori-ecommerce/products/coffin-child2_nxcqxw.png'],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,

          };
        },
      ),
      // line_items: [
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: process.env.PRICE_ID,
      //     quantity: 1,
      //   },
      // ],
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

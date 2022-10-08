import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: process.env.PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });
    res.redirect(303, session.url);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

export default handler;

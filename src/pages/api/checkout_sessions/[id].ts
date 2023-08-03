import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const { id } = req.query as any
    // console.log('dauphaihau debug: id', id)
    // console.log('dauphaihau debug: req-query', req.query)
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);
    res.status(200).json(checkout_session);
  } catch (err) {
    console.log('dauphaihau debug: err', err)
    res.status(err.statusCode || 500).json(err.message);
  }
});

export default handler;

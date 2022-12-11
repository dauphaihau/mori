import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../lib/models/Product';
import db from "../../../lib/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const product = await Product.findOne({ name: req.query.name }).lean();
    // console.log('dauphaihau debug: product', product)

    await db.disconnect();
    // console.log('dauphaihau debug: products', products)
    res.json({
      code: '200',
      message: 'OK',
      product,
    })
  } catch (error) {
    return res.status(500).end()
  }
});

export default handler;

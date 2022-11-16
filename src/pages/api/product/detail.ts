import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const value = req.query
  console.log('dauphaihau debug: value', value)
  console.log('dauphaihau debug: req-query', req.query.name)

  const product = await Product.findOne({ name: req.query.name }).lean();

  await db.disconnect();
  // console.log('dauphaihau debug: products', products)
  res.json({
    code: '200',
    message: 'OK',
    product,
  })
});

export default handler;

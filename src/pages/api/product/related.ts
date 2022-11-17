import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  console.log('dauphaihau debug: value', req.query)
  console.log('dauphaihau debug: req-body', req.body)
  console.log('dauphaihau debug: req-query', req.query.category)

  // const products = await Product.find();

  // productByCategory
  const products = await Product.find({categories: req.query.category }).limit(4);
  // const products = await Product.find({category: req.query.category }).limit(4);

  // const products = await Product.find({ categories: product.category }).limit(4);
  console.log('dauphaihau debug: products', products)

  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    products,
  })
});

export default handler;

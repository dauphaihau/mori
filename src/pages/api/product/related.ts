import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from 'lib/models/Product';
import db from "lib/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  // console.log('dauphaihau debug: req-query', req.query.category)
  // console.log('dauphaihau debug: req-query', req.query.name)

  const products = await Product.find({
    $and: [
      { category: {$eq: req.query.category} },
      { name: { $ne: req.query.name } }
    ]
  }).limit(4);
  // console.log('dauphaihau debug: products', products)

  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    products,
  })
});

export default handler;

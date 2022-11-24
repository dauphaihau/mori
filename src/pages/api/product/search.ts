import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import mongoose from "mongoose";

import Product from '../../../lib/models/Product';
import db from "../../../lib/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  console.log('dauphaihau debug: req-query', req.query)
  const products = await Product.find({ name: { $regex: req.query.search, $options: 'i' } })
  console.log('dauphaihau debug: products', products)
  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    result: products.length,
    products
  });
})

export default handler;

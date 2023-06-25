import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import mongoose from "mongoose";

import Product from 'lib/models/Product';
import db from "lib/db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const products = await Product.find({ name: { $regex: req.query.search, $options: 'i' } })
    await db.disconnect();
    res.json({
      code: '200',
      message: 'OK',
      result: products.length,
      products
    });
  } catch (error) {
    return res.status(500).end()
  }
})

export default handler;

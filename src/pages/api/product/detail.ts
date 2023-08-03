import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from 'lib/models/Product';
import db from "lib/db";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const product = await Product.findOne({ name: req.query.name }).lean();
    await db.disconnect();
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

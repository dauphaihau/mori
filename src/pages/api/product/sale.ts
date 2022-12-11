import { NextApiRequest, NextApiResponse } from "next";
import Product from "lib/models/Product";
import db from "lib/db";
import nc from 'next-connect';

const handler = nc();

const arrNames = [
  'Willow Pod Coffin',
  'Wicker Coffin',
  'Seagrass Coffin',
  'Cane Coffin',
  'Bamboo Coffin',
]

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    const products = await Product.find({ 'name': { $in: arrNames } });
    // console.log('dauphaihau debug: products', products)
    await db.disconnect();
    res.json({
      code: '200',
      message: 'OK',
      products
    });
  } catch (error) {
    return res.status(500).end()
  }
});

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  // const categories = await Product.aggregate().sortByCount("categories");
  const categories = await Product.aggregate().sortByCount("category");
  // const categories = await Product.aggregate([
  //   {
  //     $group: {
  //       _id: '$category',
  //       count: { $sum: 1 } // this means that the count will increment by 1
  //     }
  //   }
  // ]);

  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    categories
  })
});

export default handler;
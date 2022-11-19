import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  // console.log('dauphaihau debug: req-query-category', req.query)

  const colors = await Product.aggregate([
    // req.query.category === 'all' ? null :{
    //   $match: {
    //     category: req.query.category
    //     // category: 'coffin'
    //   }
    // },
    {
      $match: req.query.category === 'all' ? {} : {
        category: req.query.category
        // category: 'coffin'
      }
    },
    {
      $project: {
        color: 1,
        _id: 0
      }
    },
    { $group: { _id: null, uniqueValues: { $addToSet: "$color" } } },
  ])

  // console.log('dauphaihau debug: colors', colors)

  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    colors: colors[0].uniqueValues
  })
});

export default handler;

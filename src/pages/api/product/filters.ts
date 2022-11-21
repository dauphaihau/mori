import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const colors = await Product.aggregate([
    { $match: req.query.category === 'all' ? {} : { category: req.query.category } },
    { $project: { color: 1, _id: 0 } },
    { $group: { _id: "$color" } },
    { $sort: { _id: 1 } },
    // { $group: { _id: null, uniqueValues: { $addToSet: "$color" } } },
  ])

  // const materialsTest = await Product.aggregate([
  //   {
  //     $match: req.query.category === 'all' ? {} : {
  //       category: req.query.category
  //       // category: 'coffin'
  //     }
  //   },
  //   {
  //     $project: {
  //       material: 1,
  //       _id: 0
  //     }
  //   },
  //   { $group: { _id: null, uniqueValues: { $addToSet: "$material" } } },
  // ])

  const materials = await Product.aggregate([
    { $match: req.query.category === 'all' ? {} : { category: req.query.category } },
    { $project: { material: 1, _id: 0 } },
    { $group: { _id: "$material" } },
    { $sort: { _id: 1 } },
  ])

  // console.log('dauphaihau debug: materials', materials)
  // console.log('dauphaihau debug: colors', colors)

  const price = await Product.aggregate([
    { $match: req.query.category === 'all' ? {} : { category: req.query.category } },
    { $project: { price: 1, _id: 0 } },
    { $sort: { _id: 1 } },
    { $limit: 1 }
  ])

  // console.log('dauphaihau debug: price', price)

  /*
  price
  1. find min-max in cg
      or just need find max price ( 0 is default )
  2. map to -> options ( 500, 1000, 1500, .. )
  case 1800
  if co so du 300 → over 1500
   */

  // console.log('dauphaihau debug: price-0-price', price[0].price)

  const maxPrice = price[0].price
  const perPrice = 500
  const rounded = Math.ceil(maxPrice / perPrice)

  const priceDataa = Array(rounded).fill('').map((_, idx) => ({
    id: `${idx * perPrice}-${(idx + 1) * perPrice}`,
    title: `$${idx * perPrice} - $${(idx + 1) * perPrice}`,
  }))

  // console.log('dauphaihau debug: price-dataa', priceDataa)

  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    // colors: colors[0].uniqueValues,
    // materials: materials[0].uniqueValues,
    materials: materials.map(o => o._id),
    colors: colors.map(o => o._id),
    prices: priceDataa
  })
});

export default handler;

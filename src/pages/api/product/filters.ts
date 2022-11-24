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

  // const mateAndColo = await Product.aggregate([
  //   { $match: req.query.category === 'all' ? {} : { category: req.query.category } },
  //   { $project: { material: 1, color: 1, _id: 0 } },
  //   { $group: {
  //     _id: null,
  //       materials: { $sort: 1},
  //       color: { $sort: 1}
  //      }
  //   },
  //   { $sort: { _id: 1 } },
  // ])

  //<editor-fold desc="Price">
  const price = await Product.aggregate([
    { $match: req.query.category === 'all' ? {} : { category: req.query.category } },
    {
      $group: {
        _id: null,
        max_val: { $max: '$price' },
        min_val: { $min: '$price' }
      }
    }
  ])

  // console.log('dauphaihau debug: price', price)
  // console.log('dauphaihau debug: price-0-price', price[0].price)

  const maxPrice = price[0].max_val
  const minPrice = price[0].min_val
  const maxRow = 5
  const perPrice = 500
  const nearest500 = Math.floor(minPrice / perPrice) * perPrice
  const roundedByMaxPrice = Math.ceil(maxPrice / perPrice)

  const priceDataa = Array(roundedByMaxPrice > maxRow ? maxRow : roundedByMaxPrice).fill('').map((_, idx) => {
    if ((idx + 1) === maxRow) {
      return {
        id: `${nearest500 + (idx * perPrice)}`,
        title: `Over $${nearest500 + (idx * perPrice)}`,
      }
    }
    return {
      id: `${nearest500 + (idx * perPrice)}-${nearest500 + ((idx + 1) * perPrice)}`,
      title: `$${nearest500 + (idx * perPrice)} - $${nearest500 + ((idx + 1) * perPrice)}`,
    }
  })
  // console.log('dauphaihau debug: price-dataa', priceDataa)
  //</editor-fold>

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

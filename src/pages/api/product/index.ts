import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";

const handler = nc();

class APIFeatures {
  private queryString: any;
  query: any;

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }

    // const excludeFields = ['page', 'sort', 'limit']
    // excludeFields.forEach(el => delete (queryObj[el]))

    if (queryObj.category !== 'all') this.query.find({ categories: queryObj.category })
    if (queryObj.brand !== 'all') this.query.find({ brand: queryObj.brand })
    if (queryObj.color !== 'all') this.query.find({ colors: queryObj.color })

    if (queryObj.price) {
      // console.log('dauphaihau debug: query-obj-price', queryObj.price)
      // console.log('dauphaihau debug: query-obj-price-split-', queryObj.price.split(','))

      const arrRangePrice = queryObj.price.split(',')
      const queryRangeList = arrRangePrice.map(item => {
        console.log('dauphaihau debug: item', item.split('-'))
        const [a, b] = item.split('-')
          if (b) {
            return {
              "$and": [
                { "price": { "$gt": Number(a) } },
                { "price": { "$lte": Number(b) } }
              ]
            }
          }
          return {
            "$and": [{ "price": { "$gte": Number(a) } }]
          }
      })
      this.query.find({ "$or": queryRangeList })
    }
    this.query.find()
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 6
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const features = new APIFeatures(Product.find(), req.query)
  .filtering()
  .sorting()
  .paginating()
  const products = await features.query
  // const countQuery = await features.query.count()


  // features.query.countDocuments(features.queryString, function countResults(err, result) {
  //   if (err) {
  //     //handle error
  //   }
  //   console.log(result);
  // });

  const total = await Product.countDocuments()
  // console.log('dauphaihau debug: products', products)
  res.json({
    code: '200',
    message: 'OK',
    products,
    total
  })
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const products = await Product.find({ name: { $regex: req.query.search, $options: 'i' } })
  await db.disconnect();
  res.json({
    code: '200',
    message: 'OK',
    result: products.length,
    products
  });
})

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import mongoose from "mongoose";

import Product from '../../../server/models/Product';
import db from "../../../server/config/db";
import { IProduct } from "../../../types/product";

const handler = nc();

class APIFeatures {
  queryString: any;
  query: any;

  constructor(query: IProduct, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }

    // const excludeFields = ['page', 'sort', 'limit']
    // excludeFields.forEach(el => delete (queryObj[el]))

    if (queryObj.category !== 'all') this.query.find({ category: queryObj.category })
    if (queryObj.material !== 'all') this.query.find({ material: queryObj.material })
    if (queryObj.color !== 'all') this.query.find({ color: queryObj.color })
    // if (queryObj.color !== 'all') this.query.find({ colors: queryObj.color })

    if (queryObj.price) {
      // console.log('dauphaihau debug: query-obj-price', queryObj.price)
      // console.log('dauphaihau debug: query-obj-price-split-', queryObj.price.split(','))

      const arrRangePrice = queryObj.price.split(',')
      const queryRangeList = arrRangePrice.map(item => {
        // console.log('dauphaihau debug: item', item.split('-'))
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

  count() {
    this.query = this.query.countDocuments()
    return this;
  }
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const features = new APIFeatures(Product.find(), req.query)
  .filtering()
  .sorting()
  .paginating()

  const products = await features.query
  // console.log('dauphaihau debug: products-', products)

  // total w filter, sort (count without paginate )
  const features2 = new APIFeatures(Product.find(), req.query)
  .filtering()
  .sorting()
  .count()

  const total = await features2.query
  console.log('dauphaihau debug: total', total)

  await db.disconnect();

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

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('dauphaihau debug: req-body', req.body)
  // const mapped = req.body.ids.map(item => mongoose.Types.ObjectId(item))

  // console.log('dauphaihau debug: mapped', mapped)
  // console.log('dauphaihau debug: data', data)

  const result = await Product.find({ 'name': { $in: ['Autumn Oak Hardwood', 'Clarksburg Wooden Casket'] } });
  // const result = await Product.find({ '_id': { $in: mapped } });

  // console.log('dauphaihau debug: result', result)

  res.json({
    code: '200',
    message: 'OK',
    result
  });
  await db.disconnect();
});

export default handler;

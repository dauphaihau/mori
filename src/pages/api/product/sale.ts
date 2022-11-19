import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../server/models/Product";
import db from "../../../server/config/db";
import nc from 'next-connect';

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
// handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log('dauphaihau debug: req-body', req.body)
  // const mapped = req.body.ids.map(item => mongoose.Types.ObjectId(item))

  // console.log('dauphaihau debug: mapped', mapped)
  // console.log('dauphaihau debug: data', data)
  // console.log('dauphaihau debug: req-query', req.query)

  const result = await Product.find({ 'name': { $in: [ 'Autumn Oak Hardwood', 'Clarksburg Wooden Casket' ] } });
  // const result = await Product.find({ '_id': { $in: mapped } });

  console.log('dauphaihau debug: result', result)

  res.json({
    code: '200',
    message: 'OK',
    result
  });
  await db.disconnect();
});

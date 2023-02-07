import nc from 'next-connect';
// import Product from '../../models/Product';
import data from "assets/data/user-seed";
import Customer from "lib/models/Customer";
import db from "lib/db";
import {NextApiRequest, NextApiResponse} from "next";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // return res.send({message: 'already seeded'});
  await db.connect();
  await Customer.deleteMany();
  await Customer.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  await db.disconnect();
  return res.send({message: 'seeded successfully'});
});

export default handler;

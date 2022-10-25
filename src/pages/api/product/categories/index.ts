import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../server/models/Product";
import nc from "next-connect";
// import inventoryCategories from "../../../assets/data/InventoryData/inventoryCategories";
import db from "../../../../server/db/db";

const handler = nc();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {

  await db.connect();
  const products = Product.find()
  await db.disconnect();
  // const categoriesData = inventoryCategories(products)
  // console.log('dauphaihau debug: categories-data', categoriesData)

  res.json({
    code: '200',
    message: 'OK',
    // categories: categoriesData
  })
});


import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import Product from 'lib/models/Product';
import db from "lib/db";
import Review from "lib/models/Review";
import ProductPurchased from "lib/models/ProductPurchased";
import Customer from "lib/models/Customer";
import { isAuth } from "lib/middlewares/auth";
import { ICustomer } from "types/customer";
import { SORT_BY_REVIEW } from "config/const";
import { ampValidation } from "next/dist/build/output";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();

    const query = req.query
    console.log('dauphaihau debug: query', query)

    const sortBy = {
      [SORT_BY_REVIEW.MOST_RECENT]: '-createdAt',
      [SORT_BY_REVIEW.SUGGESTED]: '-rating'
    }

    const page = Number(query.page) || 1
    const limit = Number(query.limit)
    const skip = (page - 1) * limit;
    const reviews = await Review
    .find({ productId: query.productId })
    .limit(limit)
    .skip(skip)
    .sort(sortBy[Number(query.sortBy)])
    .populate({ path: 'customerId', select: 'name', model: Customer })
    .exec()

    const total = await Review
    .find({ productId: query.productId })
    .countDocuments()

    console.log('dauphaihau debug: reviews', reviews)
    console.log('dauphaihau debug: total', total)

    await db.disconnect();

    res.json({
      code: '200',
      message: 'OK',
      reviews,
      total
    })
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message);
  }
});

handler.use(isAuth);

interface MyCustomerRequest extends NextApiRequest {
  customer?: ICustomer;
}

handler.post(async (req: MyCustomerRequest, res: NextApiResponse) => {
  try {
    await db.connect();

    const isProductPurchase = await ProductPurchased.findOne({
      productId: req.body.productId,
      customerId: req.customer.id
      // author: req.customer.id
    })
    console.log('dauphaihau debug: is-product-purchase', isProductPurchase)

    if (!isProductPurchase) {
      return res.status(422).send({ message: 'You must purchase before review' });
    }

    // const isExistReview = await Review.findOne({ productId: req.body.productId, author: req.customer.id })
    const isExistReview = await Review.findOne({ productId: req.body.productId, customerId: req.customer.id })
    if (isExistReview) {
      return res.status(422).send({ message: 'Thanks, we already have your review for this item.' });
    }

    const payload = { ...req.body, customerId: req.customer.id }
    // const payload = { ...req.body, author: req.customer.id }

    const updateAverageStars = async () => {
      const reviews = await Review.find({ productId: req.body.productId }).select(['rating'])

      const obj = {}
      reviews.forEach(rv => {
        obj[rv.rating] = (obj[rv.rating] || 0) + 1
      })
      console.log('dauphaihau debug: obj', obj)

      const oneStar = obj['1'] || 0,
        twoStar = obj['2'] || 0,
        threeStar = obj['3'] || 0,
        fourStar = obj['4'] || 0,
        fiveStar = obj['5'] || 0

      const oneTotal = oneStar,
        twoTotal = twoStar * 2,
        threeTotal = threeStar * 3,
        fourTotal = fourStar * 4,
        fiveTotal = fiveStar * 5;

      const totalClicks = (oneStar + twoStar + threeStar + fourStar + fiveStar);
      const totalStars = (oneTotal + twoTotal + threeTotal + fourTotal + fiveTotal);
      const averageStars = (totalStars / totalClicks);

      console.log('dauphaihau debug: average-stars', averageStars)
      await Product.findByIdAndUpdate(req.body.productId, { rating: averageStars }).then((updated) => {
        console.log('dauphaihau debug: updated', updated)
        res.send({ code: '200', message: 'OK', data: { averageStars } });
      }, (err) => {
        console.log('dauphaihau debug: err', err)
      })
    }

    await new Review(payload).save().then(async (savedData) => {
      console.log('dauphaihau debug: saved-data', savedData)
      await updateAverageStars()
      // res.send({ code: '200', message: 'OK', data: { averageStars } });
    }, (error) => {
      console.log('dauphaihau debug: error', error)
    })

    await db.disconnect();

  } catch (error) {
    return res.status(500).end()
  }
});

export default handler;

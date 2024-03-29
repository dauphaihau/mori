import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { isFalsy, parseJSON } from "core/helpers";
import { config } from 'config';
import { ICustomer } from "types/customer";
import { IToken } from "types/token";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe"

import { isAuth } from "lib/middlewares/auth";
import Order from "lib/models/Order";

const handler = nc<NextApiRequest, NextApiResponse>();

interface MyCustomerRequest extends NextApiRequest {
  customer?: ICustomer;
  query: {
    page: string,
    limit: string,
  }
}

handler.use(isAuth)

handler.post(async (req: MyCustomerRequest, res) => {
  try {

    /* get list charge ( and all product are pick in charge ) */
    const { chargeId } = req.body
    console.log('dauphaihau debug: charge-id', chargeId)

    const order = await Order.findOne({ stripeChargeId: chargeId })
    console.log('dauphaihau debug: order', order)

    let purchasedProducts = {
      list: [],
      totalDetails: {},
      amountTotal: 0,
      amountSubtotal: 0
    };
    let customer = {
      paymentMethod: '',
      createdAt: null
    };
    if (order.stripeCheckoutSessionId) {
      // info product in order
      const session = await stripe.checkout.sessions.retrieve(
        order.stripeCheckoutSessionId,
        {
          expand: ['line_items'],
        }
      );
      console.log('dauphaihau debug: session', session)
      purchasedProducts.list = session.line_items.data
      purchasedProducts.amountTotal = session.amount_total
      purchasedProducts.amountSubtotal = session.amount_subtotal
      purchasedProducts.totalDetails = session.total_details
      customer = session.customer_details
      customer.paymentMethod = session.payment_method_types[0]
      customer.createdAt = new Date(order.createdAt as string).getTime()
    }

    res.send({
      code: '200',
      message: 'OK',
      customer,
      purchasedProducts
    })
  } catch (err) {
    console.log('dauphaihau debug: err', err)
    res.status(err.statusCode || 500).json(err.message);
  }
})

/* get list charge ( include all product are pick in charge ) */
handler.get(async (req: MyCustomerRequest, res) => {
  try {
    const { page, limit } = req.query;
    const customerId = req.customer.id
    console.log('dauphaihau debug: req-query', req.query)
    console.log('dauphaihau debug: customer-id', customerId)

    let paginatedOrderList = [];

    const params: Stripe.ChargeSearchParams = {
      // query: 'status:\'succeeded\' AND metadata[\'order_id\']:\'6735\'',
      query: `metadata[\'customerId\']:\'${customerId}\'`,
      limit: Number(limit),
      expand: ['total_count'],
    }

    if (isFalsy(page)) {

      const tempParams = { ...params }

      console.log('dauphaihau debug: run case 1')
      const getAllPaginatedOrder = async (nextPage?: string) => {
        // const params: Stripe.ChargeSearchParams = {
        //   query: `metadata[\'customerId\']:\'${customerId}\'`,
        //   limit: Number(limit),
        //   expand: ['total_count']
        // }
        if (nextPage) {
          tempParams.page = nextPage
        }

        const orders = await stripe.charges.search(tempParams);
        if (!orders.has_more) return

        paginatedOrderList.push(orders.next_page)
        await getAllPaginatedOrder(orders.next_page)
      }
      await getAllPaginatedOrder()

    } else {
      console.log('dauphaihau debug: run case 2')
      params.page = page
    }

    console.log('dauphaihau debug: params', params)
    const orders = await stripe.charges.search(params);
    // console.log('dauphaihau debug: orders', orders)
    // console.log('dauphaihau debug: charge-page-list', paginatedOrderList)

    res.send({
      code: '200',
      message: 'OK',
      orders,
      paginatedOrderList,
    })
  } catch (err) {
    console.log('dauphaihau debug: err', err)
    res.status(err.statusCode || 500).json(err.message);
  }
})

export default handler;

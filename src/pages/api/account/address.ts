import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import db from 'lib/db';
import Address from "lib/models/Address";
import { isAuth } from 'lib/middlewares/auth';
import { ICustomer } from "types/customer";
import { isValidObjectId } from "lib/middlewares/token";

const handler = nc<NextApiRequest, NextApiResponse>();

interface MyCustomerRequest extends NextApiRequest {
  customer?: ICustomer;
}

handler.use(isAuth);
handler.get(async (req: MyCustomerRequest, res) => {
  try {
    await db.connect()
    let address;

    // Boolean query parameters
    // req.query.isPrimary is 'true' or 'false'
    if (req.query.isPrimary === 'true') {
      address = await Address.findOne({ customerId: req.customer.id, isPrimary: true })
    } else {
      address = await Address.find({ customerId: req.customer.id }).sort({ 'isPrimary': -1 })
    }

    return res.send({
      code: '200',
      message: 'OK',
      address
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

handler.post(async (req: MyCustomerRequest, res) => {
  try {
    await db.connect()
    const { isPrimary } = req.body
    const customerId = req.customer.id

    if (isPrimary) {
      const filter = { customerId, isPrimary }
      const update = { isPrimary: false }
      await Address.findOneAndUpdate(filter, update)
    }

    new Address({ ...req.body, customerId }).save().then((data) => {
      console.log("saved data ", data);
      return res.send({
        status: '200',
        message: 'OK'
      });
    }).catch(function (error) {
      console.log('dauphaihau debug: error', error)
      return res.status(422).send({
        status: '402',
        message: 'missing field'
      });
    });

    await db.disconnect();
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

handler.put(async (req: MyCustomerRequest, res) => {
  try {
    const { id, ...dataUpdate } = req.body
    await db.connect();

    // check primary address is already in db
    const isPrimary = req.body.isPrimary
    if (isPrimary) {
      const filter = { customerId: req.customer.id, isPrimary }
      const update = { isPrimary: false }
      await Address.findOneAndUpdate(filter, update)
    }
    await Address.findOneAndUpdate({ _id: id }, { $set: dataUpdate })

    await db.disconnect();
    return res.send({
      status: '200',
      message: 'updated address successfully'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body

    if (!isValidObjectId(id)) {
      return res.status(400).send({
        code: '400',
        message: 'Id is invalid'
      });
    }

    const isExist = await Address.exists({ _id: id })

    if (!isExist) {
      return res.status(404).send({
        code: '404',
        message: 'Id is invalid'
      });
    }

    await Address.deleteOne({ _id: id })

    return res.send({
      status: '200',
      message: 'OK'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;

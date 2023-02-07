import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import { isAuth } from 'lib/middlewares/auth';
import { ICustomer, IToken } from "types/customer";
import { sendResetPasswordEmail } from "lib/mailer";
import Customer from 'lib/models/Customer';
import Token from 'lib/models/Token';
import db from 'lib/db';
import { config } from "config";
import { isValidToken } from "lib/middlewares/token";
import { verifyToken } from "lib/jwt";
import { parseJSON } from "core/helpers";

const handler = nc<NextApiRequest, NextApiResponse>();

interface MyCustomerRequest extends NextApiRequest {
  customer?: ICustomer;
  tokenDB?: IToken;
}

// req password reset link
handler.post(async (req, res) => {
  try {
    await db.connect();
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) res.status(401).send({
      code: '401',
      message: 'Email does not exists! '
    });

    const token = await Token.findOne({ customerId: customer._id });
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, config.bcryptSalt);
    await sendResetPasswordEmail({ toCustomer: customer, token: resetToken });

    await new Token({
      customerId: customer._id,
      token: hash,
    }).save();

    await db.disconnect();

    return res.send({
      code: '200',
      message: 'Please check your email to reset the password!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
})

// change password
// handler.use(isAuth);
// handler.use('http://localhost:3000/account', isAuth);
// handler.use(PATH.ACCOUNT._, isAuth);
handler.put(async (req: MyCustomerRequest, res) => {
  try {
    const { password, newPassword } = req.body;
    const { authorization } = req.headers;
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET
    const now = new Date().getTime();

    const authData = authorization?.replace('Bearer ', '');
    const { token } = parseJSON<IToken>(authData)
    console.log('dauphaihau debug: token', token)
    const dataToken = await verifyToken(token, secret)
    console.log('dauphaihau debug: data-token', dataToken)

    if (!dataToken) {
      res.status(401).send({ code: '401', message: 'Token is not valid' });
    }

    // if (dataToken.exp > now) { // mock
    if (dataToken.exp < now) {
      return res.status(401).send({ code: '4001', message: 'Token is not valid' });
    }

    await db.connect();
    const customer = await Customer.findOne({ email: dataToken.email }, 'password').exec();
    // const customer = await Customer.findOne({ email: req.customer.email }, 'password').exec();
    if (!customer) return res.status(404).send({ code: '404', messages: 'Customer doesn\'t exist' });

    if (password !== customer.password) {
      return res.status(403).send({
        code: '403',
        message: 'Old password is incorrect'
      });
    }

    customer.password = newPassword;
    await customer.save();
    await db.disconnect();
    res.send({ code: '200', message: 'OK' });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
})

handler.use(isValidToken)
// check token
handler.get(async (req, res) => {
  try {
    await db.connect();
    await db.disconnect();
    return res.send({
      code: '200',
      message: 'OK'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

// reset password
handler.delete(async (req: MyCustomerRequest, res) => {
  try {
    const { password } = req.body
    await db.connect();

    const tokenDB = req.tokenDB;
    await tokenDB.deleteOne();

    await Customer.updateOne(
      { _id: req.tokenDB.customerId },
      { $set: { password: password } },
      { new: true }
    );

    await db.disconnect();
    return res.send({
      code: '200',
      message: 'Password has been reset!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;

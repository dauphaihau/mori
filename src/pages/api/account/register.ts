import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Customer from 'lib/models/Customer';
import { signToken } from 'lib/jwt';
import db from 'lib/db';
import { ROLE, USER_STATUS } from 'config/const';
import { sendResultRegister } from 'lib/mailer';
import { config } from "config";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    const { email, name, password } = req.body
    await db.connect();

    if (await Customer.exists({ email })) {
      return res.status(409).send({ code: '409', message: `That email is taken` });
    }

    const newCustomer = {
      name, email, password,
      role: ROLE.ACCOUNT,
      status: USER_STATUS.NOT_ACTIVATED
    }

    new Customer(newCustomer).save();
    await db.disconnect();

    await sendResultRegister({ email });

    delete newCustomer.password
    const token = await signToken(newCustomer, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(newCustomer, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: { token, refreshToken },
          profile: newCustomer
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ code: '422', message: 'Ooops, something went wrong!' });
  }
});

export default handler;

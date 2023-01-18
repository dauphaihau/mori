import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Customer from 'lib/models/Customer';
import db from 'lib/db';
import { signToken } from 'lib/jwt';
import { config } from "config";
import { ICustomer } from "types/customer";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { email, password } = req.body;
    await db.connect();
    const customer: ICustomer = await Customer.findOne({ email }, {
      email: 1,
      name: 1,
      role: 1,
      status: 1,
      password: 1,
    });

    if (!customer) {
      return res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    await db.disconnect();
    if (password !== customer.password) {
      return res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    const profile = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      status: customer.status,
    }

    const token = await signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

    delete profile.id

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: { token, refreshToken },
          profile
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ code: '422', message: 'Ooops, something went wrong!' });
  }
});

export default handler;

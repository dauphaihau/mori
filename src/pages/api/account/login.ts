import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import dayjs from "dayjs";

import db from 'lib/db';
import { signToken } from 'lib/jwt';
import Customer from 'lib/models/Customer';
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

    let expiredAt: Date | number = new Date();
    expiredAt.setUTCDate(expiredAt.getUTCDate() + 7);
    expiredAt = dayjs(expiredAt).valueOf()

    let refreshAt: Date | number = new Date();
    refreshAt.setUTCDate(refreshAt.getUTCDate() + 1);
    refreshAt = dayjs(refreshAt).valueOf()

    const token = await signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, expiredAt);

    delete profile.id

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: { token, expiredAt, refreshAt },
          profile,
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ code: '422', message: 'Ooops, something went wrong!' });
  }
});

export default handler;

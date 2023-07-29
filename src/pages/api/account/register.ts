import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import dayjs from 'dayjs';

import Customer from 'lib/models/Customer';
import { signToken } from 'lib/jwt';
import db from 'lib/db';
import { ROLE, USER_STATUS } from 'config/const';
import { sendResultRegister } from 'lib/mailer';
import { config } from "config";
import { ICustomer } from "types/customer";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  try {
    const { email, name, password } = req.body
    await db.connect();

    if (await Customer.exists({ email })) {
      return res.status(409).send({ code: '409', message: `That email is taken` });
    }

    const newCustomer: Partial<ICustomer> = {
      name, email, password,
      role: ROLE.ACCOUNT,
      status: USER_STATUS.NOT_ACTIVATED
    }

    new Customer(newCustomer).save().then(async (savedData) => {
      console.log("saved savedData ", savedData);

      await sendResultRegister({ email });

      let expiredAt: Date | number = new Date();
      expiredAt.setUTCDate(expiredAt.getUTCDate() + 7);
      expiredAt = dayjs(expiredAt).valueOf()

      let refreshAt: Date | number = new Date();
      refreshAt.setUTCDate(refreshAt.getUTCDate() + 1);
      refreshAt = dayjs(refreshAt).valueOf()

      delete savedData.password
      newCustomer.id = savedData.id

      // time life token 5700 ( 1.5 hours )
      // const token = await signToken(newCustomer, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
      const token = await signToken(newCustomer, process.env.NEXT_PUBLIC_JWT_SECRET, expiredAt);

      // time life token 604800000 ( 1 week )
      const refreshToken = await signToken(newCustomer, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

      res.send(
        {
          code: '200',
          message: 'OK',
          data: {
            auth: { token, refreshToken, expiredAt, refreshAt },
            profile: newCustomer
          }
        });

    });
    await db.disconnect();

  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ code: '422', message: 'Ooops, something went wrong!' });
  }
});

export default handler;

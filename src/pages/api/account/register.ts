import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Customer from 'lib/models/Customer';
import { signToken } from 'lib/jwt';
import db from 'lib/db';
import { ROLE, USER_STATUS } from 'config/const';
import { sendResultRegister } from 'lib/mailer';
import { config } from "config";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name, password } = req.body

    await db.connect();
    if (await Customer.findOne({ email })) {
      res.status(409).send({ message: `That email is taken` });
    }
    const newUser = new Customer({
      name, email, password,
      role: ROLE.ACCOUNT,
      status: USER_STATUS.NOT_ACTIVATED
    });
    await newUser.save();
    // const user = await newUser.save();
    await db.disconnect();

    // const profile = {
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   status: user.status,
    // }

    // await sendResultRegister({ email });
    // const token = signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    // const tomorrow: any = new Date(Date.now() + (3600 * 1000 * 24))

    res.send(
      {
        code: '200',
        message: 'OK',
        // data: {
        //   auth: {
        //     token,
        //     expireAt: Date.parse(tomorrow),
        //   },
        //   profile
        // }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

export default handler;

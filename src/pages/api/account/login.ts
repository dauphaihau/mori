import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from 'lib/models/User';
import db from 'lib/db';
import { signToken } from 'lib/jwt';
import { config } from "config";
import { IUser } from "types/user";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { email, password } = req.body;
    await db.connect();
    let user: IUser = await User.findOne({ email }, {
      email: 1,
      name: 1,
      role: 1,
      status: 1,
      password: 1,
      _id: 0
    });
    if (!user) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    await db.disconnect();
    if (password !== user.password) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    const profile = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    const token = await signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(profile, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

    res.json(
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
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from 'lib/models/User';
import db from 'lib/db';
import { signToken } from 'lib/jwt';
import config from "config/config.json";
import { IUser } from "types/user";

const handler = nc();

type ResponseUser = Pick<IUser, "name" | "email" | 'role'| 'status' | 'password'>;

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { email, password } = req.body;
    await db.connect();
    let user: ResponseUser = await User.findOne({ email }, { email: 1, name: 1, role: 1, status: 1, password: 1, _id: 0 });
    if (!user) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    await db.disconnect();
    if (password !== user.password) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    user  = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    const token = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

    delete user.password

    res.json(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: {
            token,
            refreshToken,
            // expireAt: Date.parse(tomorrow),
          },
          profile: user
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

export default handler;

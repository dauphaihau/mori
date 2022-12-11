import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from 'lib/models/User';
import db from 'lib/db';
import { signToken } from 'lib/jwt';
import config from "config/config.json";
import { IUser } from "../../../types/user";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('dauphaihau debug: req-body', req.body)
  const { email, password } = req.body;
  try {
    await db.connect();
    // let user = await User.findOne({ email });
    let user = await User.findOne({ email }, { email: 1, name: 1, role: 1, status: 1, password: 1, _id: 0 });
    // console.log('dauphaihau debug: userr', userr)
    if (!user) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }
    await db.disconnect();
    if (password !== user.password) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }
    console.log('dauphaihau debug: user', user)

    user = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    console.log('dauphaihau debug: user', user)

    const token = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

    delete user.password
    console.log('dauphaihau debug: user', user)

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
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from 'server/models/User';
import db from 'server/config/db';
import { signToken } from 'lib/jwt';
import config from "config/config.json";

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  try {
    await db.connect();
    let user = await User.findOne({ email });
    if (!user) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }
    await db.disconnect();
    if (password !== user.password) {
      res.status(422).send({ code: '422', message: 'Incorrect email or password.' });
    }

    user = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    }

    const token = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.tokenLife);
    const refreshToken = await signToken(user, process.env.NEXT_PUBLIC_JWT_SECRET, config.token.refreshTokenLife);

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

import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import User from 'lib/models/User';
import { signToken } from 'lib/jwt';
import db from 'lib/db';
import { ROLE, USER_STATUS } from 'config/const';
import { sendResultRegister } from 'lib/mailer';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password } = req.body

  try {
    await db.connect();
    if (await User.findOne({ email })) {
      res.status(409).send({ message: `Email '${email}' already exists` });
    }
    const newUser = new User({
      name, email, password,
      role: ROLE.ACCOUNT,
      status: USER_STATUS.NOT_ACTIVATED
    });
    const user = await newUser.save();
    await db.disconnect();

    await sendResultRegister({ email });
    const token = signToken(user);
    const tomorrow: any = new Date(Date.now() + (3600 * 1000 * 24))

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: {
            token,
            expireAt: Date.parse(tomorrow),
          },
          profile: {
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
          }
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler;

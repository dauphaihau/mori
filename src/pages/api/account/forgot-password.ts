import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const bcryptSalt = process.env.BCRYPT_SALT;
import { sendResetPasswordEmail } from "lib/mailer";
import User from 'lib/models/User';
import Token from 'lib/models/Token';
import db from 'lib/db';

const handler = nc();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect();
    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(401).send({
      status: '401',
      message: 'Email does not exists! '
    });

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    await sendResetPasswordEmail({ toUser: user, token: hash });

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    await db.disconnect();

    return res.send({
      status: '200',
      message: 'Please check your email to reset the password!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ message: 'Ooops, something went wrong!' });
  }
});

export default handler;

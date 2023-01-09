import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import User from 'lib/models/User';
import Token from 'lib/models/Token';
import db from 'lib/db';
import { sendResetPasswordEmail } from 'lib/mailer';
import Address from "lib/models/Address";
// import { USER_STATUS } from 'lib/enums';
import { isAuth } from 'lib/middlewares/auth';
import { IUser } from "../../../types/user";

const bcryptSalt = process.env.BCRYPT_SALT;

const handler = nc();
handler.use(isAuth);

interface MyUserRequest extends NextApiRequest {
  user?: IUser;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const limit = Number(req.query.limit)
  const skip = Number(req.query.skip)
  const total = await User.countDocuments();
  const users = await User.find({}).limit(limit).skip(skip);
  await db.disconnect();
  res.send({
    list: users,
    total
  });
});

handler.post(async (req: MyUserRequest, res: NextApiResponse) => {
  // const { email, name, address, phone, role, avatar, sendSetPasswordEmail } = req.body
  try {
    const user = await User.findOne({ email: req.user.email }, '_id').exec();
    const userId = user._id.toString()

    const newAddress = new Address({
      ...req.body,
      zip_code: req.body.zipCode,
      postal_code: req.body.postalCode,
      country_code: req.body.countryCode,
      userId
    });
    await newAddress.save();

    //
    // if (!sendSetPasswordEmail) {
    //   let user = await User.findOne({ email });
    //   if (!user) res.send({
    //     status: '401',
    //     message: 'User does not exists! '
    //   });
    //
    //   let resetToken = crypto.randomBytes(32).toString('hex');
    //   const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    //   await sendResetPasswordEmail({ toUser: user, token: hash });
    //
    //   await new Token({
    //     userId: user._id,
    //     token: hash,
    //     createdAt: Date.now(),
    //   }).save();
    // }
    //
    // await db.disconnect();
    return res.send({
      status: '200',
      message: 'created user updated successfully'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, status, avatar, address, phone, role } = req.body
  try {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (!user) res.status(404).send({ message: 'User Not Found' });

    user.name = name;
    user.address = address;
    user.email = email;
    user.avatar = avatar;
    user.phone = phone;
    user.status = status;
    user.role = role;
    await user.save();

    if (req.body.sendResetPasswordEmail) {
      let user = await User.findOne({ email });
      if (!user) res.send({
        status: '401',
        message: 'User does not exists! '
      });

      let resetToken = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
      await sendResetPasswordEmail({ toUser: user, token: hash });
      await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
      }).save();
    }
    await db.disconnect();
    return res.send({
      status: '200',
      message: 'updated user successfully'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (!user) res.status(404).send({ message: 'User Not Found' });
  await user.remove();
  await db.disconnect();
  res.send({ code: '200', message: 'User Deleted' });
});

export default handler;

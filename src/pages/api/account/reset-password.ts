import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import bcrypt from 'bcryptjs';

const bcryptSalt = process.env.BCRYPT_SALT;
import Token from 'lib/models/Token';
import User from 'lib/models/User';
import { encryptPassword } from "lib/crypto";
import config from "config/config.json";
import db from "../../../lib/db";

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, token, password } = req.body

    await db.connect();
    let tokenUserData = await Token.findOne({ userId });
    if (!tokenUserData) {
      res.send({
        status: '401',
        message: 'User does not exists! '
      });
    }
    bcrypt.hash(tokenUserData.token, Number(bcryptSalt), function (err, hash) {
      if (err) throw (err);
      bcrypt.compare(token, hash, function (err, result) {
        if (err) {
          res.status(401);
          res.send({
            status: '401',
            message: 'Invalid or expired password reset token'
          });
        }
        console.log(result);
      });
    });

    // const hash = await bcrypt.hash(password, Number(bcryptSalt));
    const encrypted = encryptPassword(password, config.cryptoKey)

    await User.updateOne(
      { _id: userId },
      { $set: { password: encrypted } },
      // {$set: {password: hash}},
      { new: true }
    );

    await db.disconnect();
    return res.send({
      status: '200',
      message: 'Password has been reset!'
    });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send('Ooops, something went wrong!');
  }
});

export default handler

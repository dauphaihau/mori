import nc from 'next-connect';
import User from 'lib/models/User';
import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from 'lib/jwt';

const handler = nc();
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization } = req.headers;
    const { password, newPassword } = req.body;

    const token = authorization.replace('Bearer ', '');
    const dataToken = await verifyToken(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    if (!dataToken) return res.status(401).send({ message: 'Token is not supplied' });

    await db.connect();
    const user = await User.findOne({ email: dataToken.email });

    if (!user) return res.status(422).send({ code: '422', messages: 'User doesn\'t exist' });

    if (user && password !== user.password) {
      res.status(401).send({
        code: '401',
        message: 'Password not match'
      });
    }

    user.password = newPassword;
    await user.save();
    await db.disconnect();
    res.send({ code: '200', message: 'OK' });
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export default handler;

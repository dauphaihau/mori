import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import dayjs from "dayjs";

import { verifyToken } from 'lib/jwt';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    const { token } = req.body;
    const now = new Date().getTime();
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET
    console.log('dauphaihau debug: token', token)
    const dataToken = await verifyToken(token, secret)
    console.log('dauphaihau debug: data-token', dataToken)

    // if (now < dataToken.exp) { // mock
    if (now > dataToken.exp) {
      return res.status(401).send({ code: '4001', message: 'Token is expired' });
    }

    let refreshAt: Date | number = new Date();
    refreshAt.setUTCDate(refreshAt.getUTCDate() + 1);
    refreshAt = dayjs(refreshAt).valueOf()

    res.send(
      {
        code: '200',
        message: 'OK',
        data: {
          auth: { token, expiredAt: dataToken.exp, refreshAt },
        }
      });
  } catch (error) {
    console.log('error', error)
    return res.status(422).send({ code: '422', message: 'Ooops, something went wrong!' });
  }
});

export default handler;

import { ObjectId } from "mongodb";
import bcrypt from 'bcryptjs';

import Token from "lib/models/Token";
import { isEmptyObject } from "core/helpers";

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    return (String)(new ObjectId(id)) === id;
  }
  return false;
}

export const isValidToken = async (req, res, next) => {
  let id, token

  if (!isEmptyObject(req.query)) {
    id = req.query.id
    token = req.query.token
  } else {
    id = req.body.id
    token = req.body.token
  }

  if (!isValidObjectId(id)) {
    return res.status(400).send({
      code: '400',
      message: 'Token is invalid'
    });
  }

  const tokenDB = await Token.findOne({ customerId: id }, 'token customerId');
  if (!tokenDB) {
    return res.status(404).send({
      code: '404',
      message: 'Token is invalid'
    });
  }

  const isValidToken = await bcrypt.compare(token, tokenDB.token)
  if (!isValidToken) {
    return res.status(401).send({
      code: '401',
      message: 'Invalid or expired password reset token'
    });
  }
  tokenDB.id = tokenDB.id.toString()
  req.tokenDB = tokenDB
  next()
}

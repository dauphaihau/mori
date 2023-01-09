import bcrypt from 'bcryptjs';
import { config } from "config";
import { encryptPassword } from "lib/crypto";

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: encryptPassword('111111', config.cryptoKey),
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: encryptPassword('222222', config.cryptoKey),
    },
  ],
};
export default data;

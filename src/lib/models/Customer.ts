import mongoose, { Schema } from 'mongoose';
import { ICustomer } from 'types/customer';
import { encryptPassword } from 'lib/crypto';
import { config } from 'config';

// const bcrypt = require('bcryptjs');
// const bcryptSalt = process.env.BCRYPT_SALT;

const customerSchema = new mongoose.Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    // password: { type: String, required: true },
    // address: { type: Object },
    phone: { type: String },
    role: { type: Number, required: true },
    status: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true,
  }
);

// customerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   // const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   const hash = encryptPassword(this.password, config.cryptoKey);
//   this.password = hash;
//   next();
// });

const Customer = (mongoose.models.Customer as mongoose.Model<ICustomer>) || mongoose.model('Customer', customerSchema);
export default Customer;

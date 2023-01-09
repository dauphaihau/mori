import mongoose from "mongoose"
import { IAddress } from "types/address";

const Schema = mongoose.Schema

const addressSchema = new Schema<IAddress>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  postal_code: { type: String  },
  country_code: { type: String, required: true },
  phone: { type: String, required: true },
  primary: { type: Boolean },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   expires: 3600000
  // },
});

const Address = (mongoose.models.Address as mongoose.Model<IAddress>) || mongoose.model('Address', addressSchema);
export default Address

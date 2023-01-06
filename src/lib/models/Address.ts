import mongoose from "mongoose"
import { IAddress } from "types/address";

const Schema = mongoose.Schema

const addressSchema = new Schema<IAddress>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600000
  },
});

const Address = (mongoose.models.Address as mongoose.Model<IAddress>) || mongoose.model('Address', addressSchema);
export default Address

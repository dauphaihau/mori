import mongoose from "mongoose"
import { IAddress } from "types/address";

const Schema = mongoose.Schema

const addressSchema = new Schema<IAddress>({
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    name: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    postalCode: { type: String },
    countryCode: { type: String, required: true },
    phone: { type: String, required: true },
    isPrimary: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Address = (mongoose.models.Address as mongoose.Model<IAddress>) || mongoose.model('Address', addressSchema);
export default Address

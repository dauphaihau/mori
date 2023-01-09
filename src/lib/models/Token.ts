import mongoose from "mongoose"
import { IToken } from "types/token";

const Schema = mongoose.Schema

const tokenSchema = new Schema<IToken>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    token: {
      type: String,
      required: true,
      expires: 3600
    }
  },
  {
    timestamps: true,
  }
);

const Token = (mongoose.models.Token as mongoose.Model<IToken>) || mongoose.model('Token', tokenSchema);
export default Token

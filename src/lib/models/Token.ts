import mongoose from "mongoose"
import { IToken } from "types/token";

const Schema = mongoose.Schema

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
    expires: 3600000
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600000
  },
});

const Token = (mongoose.models.Token as mongoose.Model<IToken>) || mongoose.model('Token', tokenSchema);
export default Token

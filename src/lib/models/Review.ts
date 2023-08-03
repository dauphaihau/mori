import mongoose from "mongoose";
import { IReview } from "types/review";

const Schema = mongoose.Schema

const reviewSchema = new Schema<IReview>(
  {
    // author: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: "customer",
    //   // ref: "Customer",
    // },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    title: { type: String },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Review = (mongoose.models.Review as mongoose.Model<IReview>) || mongoose.model('Review', reviewSchema);
export default Review;

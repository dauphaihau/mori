import mongoose from "mongoose";
import { IProduct } from "types/product";

const productSchema = new mongoose.Schema<IProduct>(
  {
    // slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    colors: { type: [String], required: true },
    color: { type: String, required: true },
    salePrice: { type: Number, required: true },
    sold: { type: Number, required: true },
    bestSelling: { type: Boolean, required: true },
    rating: { type: Number,  default: 0 },
    quantity: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    // countInStock: { type: Number, required: true, default: 0 },
    // reviews: [reviewSchema],
    // sku: { type: String, required: true },
    // tax: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Product = (mongoose.models.Product as mongoose.Model<IProduct>) || mongoose.model('Product', productSchema);
export default Product;

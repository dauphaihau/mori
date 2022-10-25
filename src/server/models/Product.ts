import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    categories: { type: [String], required: true },
    price: { type: Number, required: true },
    colors: { type: [String], required: true },
    salePrice: { type: Number, required: true },
    brand: { type: String },
    sold: { type: Number , required: true},
    bestSelling: { type: Boolean, required: true },
    rating: { type: Number, required: true, default: 0 },
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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;

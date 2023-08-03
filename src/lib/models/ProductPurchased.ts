import mongoose from "mongoose";
import { IProductPurchased } from "types/product-purchased";

const Schema = mongoose.Schema

const productPurchasedSchema = new Schema<IProductPurchased>(
  {
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
  },
  {
    timestamps: true,
  }
);

const ProductPurchased = (mongoose.models.ProductPurchased as mongoose.Model<IProductPurchased>) || mongoose.model('ProductPurchased', productPurchasedSchema);
export default ProductPurchased;

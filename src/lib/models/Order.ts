import mongoose from "mongoose"
import { IOrder } from "types/order";

const Schema = mongoose.Schema

const orderSchema = new Schema<IOrder>({
    customerId: {
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "customer",
    },
    stripeCustomerId: { type: String, required: true },
    stripeCheckoutSessionId: { type: String },
    stripeChargeId: { type: String },
    // stripeChargeId: { type: String, required: true },
    // stripeInvoiceId: { type: String, required: true },

    // stripeInvoiceId: subscription.id,
    //       stripeCustomerId: subscription.customer as string,
    //       stripePriceId: subscription.items.data[0].price.id,
    //       stripeCurrentPeriodEnd: new Date(
    // payment_method_types: [ 'card' ],
    // payment_method: 'pm_1MPmqVFb1esgNmbI5hQzcz19',
  },
  {
    timestamps: true,
  }
);

const Order = (mongoose.models.Order as mongoose.Model<IOrder>) || mongoose.model('Order', orderSchema);
export default Order

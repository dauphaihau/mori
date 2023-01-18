import { Document, Mixed, StringSchemaDefinition } from 'mongoose';

export interface IOrder extends Document {
  customerId: Mixed | StringSchemaDefinition,
  stripeChargeId: string
  // stripeInvoiceId: string
  stripeCustomerId: string
  stripeCheckoutSessionId: string
}

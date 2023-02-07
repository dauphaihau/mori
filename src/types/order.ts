import { Document, Mixed, StringSchemaDefinition, SchemaTimestampsConfig } from 'mongoose';

type Example = Document & SchemaTimestampsConfig

export interface IOrder extends Example {
  customerId: Mixed | StringSchemaDefinition,
  stripeChargeId: string
  // stripeInvoiceId: string
  stripeCustomerId: string
  stripeCheckoutSessionId: string
}

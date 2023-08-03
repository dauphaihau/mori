import { Document, Mixed, StringSchemaDefinition } from 'mongoose';

export interface IProductPurchased extends Document{
  customerId: Mixed | StringSchemaDefinition,
  productId: Mixed | StringSchemaDefinition,
}

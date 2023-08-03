import { Document, Mixed, StringSchemaDefinition } from 'mongoose';

export interface IReview extends Document{
  customerId: Mixed | StringSchemaDefinition,
  // author: Mixed | StringSchemaDefinition,
  productId: Mixed | StringSchemaDefinition,
  title: string,
  description: string,
  rating: number,
}

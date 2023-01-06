import { Document, Mixed, NumberSchemaDefinition, StringSchemaDefinition} from 'mongoose';

export interface IAddress extends Document{
  userId: Mixed | StringSchemaDefinition,
  address: string,
  createdAt: Mixed | NumberSchemaDefinition,
}

import { Document, Mixed, NumberSchemaDefinition, StringSchemaDefinition} from 'mongoose';

export interface IToken extends Document{
  customerId: Mixed | StringSchemaDefinition,
  token: string,
  createdAt: Mixed | NumberSchemaDefinition,
}

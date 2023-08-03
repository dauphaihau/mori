import { Document, Mixed, NumberSchemaDefinition, StringSchemaDefinition} from 'mongoose';

export interface IToken extends Document{
  customerId: Mixed | StringSchemaDefinition,
  token: string,
  refreshAt: number
  expiredAt: number
  createdAt: Mixed | NumberSchemaDefinition,
}

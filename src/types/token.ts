import { Document, Mixed, NumberSchemaDefinition, StringSchemaDefinition} from 'mongoose';

export interface IToken extends Document{
  userId: Mixed | StringSchemaDefinition,
  token: string,
  createdAt: Mixed | NumberSchemaDefinition,
}

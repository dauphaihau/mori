import { Document, Mixed, NumberSchemaDefinition, StringSchemaDefinition} from 'mongoose';

export interface IAddress extends Document{
  userId: Mixed | StringSchemaDefinition,
  name: string
  address1: string
  address2: string
  city: string
  zip_code: string
  postal_code: string
  province: string
  country_code: string
  state: string
  phone: string
  primary: boolean
  // createdAt: Mixed | NumberSchemaDefinition,
}

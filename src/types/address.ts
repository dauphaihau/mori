import { Document, Mixed, StringSchemaDefinition } from 'mongoose';

export interface IAddress extends Document {
  customerId: Mixed | StringSchemaDefinition,
  name: string
  address1: string
  address2?: string
  city: string
  zipCode: string
  postalCode: string
  countryCode: string
  province: string
  state: string
  phone: string
  isPrimary: boolean
}

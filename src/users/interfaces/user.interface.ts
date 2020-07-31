import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  password: string;
  readonly name: string;
  readonly isAdmin: boolean;
  readonly isManufacturer: boolean;
  products: any[];
}
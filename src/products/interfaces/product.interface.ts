import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly type: string;
  readonly owner: string;
  readonly price: number;
  currency: string;
}
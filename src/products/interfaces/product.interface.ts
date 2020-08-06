import { Document } from 'mongoose';

export interface ProductParameters {
  readonly name: string;
  readonly value: string;
  readonly unit: string;
}

export interface Product extends Document {
  readonly name: string;
  readonly type: string;
  readonly owner: string;
  readonly price: number;
  readonly power: number;
  readonly description: string;
  readonly img: string;
  readonly parameters: ProductParameters[];
  currency: string;
}
import { Document } from 'mongoose';

export interface Rate extends Document {
  readonly currency: string;
  rate: number;
}
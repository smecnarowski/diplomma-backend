import { Document } from 'mongoose';

export interface EnergyConsumption extends Document {
  readonly countryName: string;
  readonly consumption: number;
  readonly locale: string;
}
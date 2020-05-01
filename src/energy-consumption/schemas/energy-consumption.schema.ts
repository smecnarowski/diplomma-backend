import * as mongoose from 'mongoose';

export const EnergyConsumptionSchema = new mongoose.Schema({
  countryName: String,
  consumption: Number,
  locale: String,
});
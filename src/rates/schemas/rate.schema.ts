import * as mongoose from 'mongoose';

export const RateSchema = new mongoose.Schema({
  currency: { 
    type: String,
    unique: true,
  },
  rate: Number,
});
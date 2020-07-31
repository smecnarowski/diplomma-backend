import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  power: Number,
  description: String,
  img: String,
  parameters: Array,
  currency: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rate'
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});
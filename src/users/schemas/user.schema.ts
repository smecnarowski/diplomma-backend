import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { 
    type: String,
    unique: true,
  },
  password: String,
  name: {
    type: String,
    minlength: 3
  },
  isAdmin: { 
    type: Boolean, 
    default: false
  },
  isManufacturer: { 
    type: Boolean, 
    default: false
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});
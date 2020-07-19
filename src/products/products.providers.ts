import { Connection } from 'mongoose';
import { ProductSchema } from './schemas/product.schema';

export const ProductsProviders = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (connection: Connection) => connection.model('Product', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
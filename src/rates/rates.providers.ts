import { Connection } from 'mongoose';
import { RateSchema } from './schemas/rate.schema';

export const RatesProviders = [
  {
    provide: 'RATE_MODEL',
    useFactory: (connection: Connection) => connection.model('Rate', RateSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
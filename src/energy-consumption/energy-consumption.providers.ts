import { Connection } from 'mongoose';
import { EnergyConsumptionSchema } from './schemas/energy-consumption.schema';

export const EnergyConsumptionProviders = [
  {
    provide: 'ENERGY_CONSUMPTION_MODEL',
    useFactory: (connection: Connection) => connection.model('EnergyConsumption', EnergyConsumptionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
import { Module } from '@nestjs/common';
import { EnergyConsumptionService } from './energy-consumption.service';
import { EnergyConsumptionProviders } from './energy-consumption.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EnergyConsumptionService, ...EnergyConsumptionProviders],
  exports: [EnergyConsumptionService]
})
export class EnergyConsumptionModule {}

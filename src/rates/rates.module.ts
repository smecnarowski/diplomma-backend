import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RatesService } from './rates.service';
import { RatesProviders } from './rates.providers';

@Module({
    imports: [DatabaseModule],
    providers: [RatesService, ...RatesProviders],
    exports: [RatesService],
  })
export class RatesModule {}
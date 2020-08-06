import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from './products.service';
import { ProductsProviders } from './products.providers';
import { CurrencyExist } from 'src/components/validators/CurrencyExists.validator';
import { RatesService } from 'src/rates/rates.service';
import { RatesModule } from 'src/rates/rates.module';

@Module({
    imports: [DatabaseModule, RatesModule],
    providers: [ProductsService, CurrencyExist, ...ProductsProviders],
    exports: [ProductsService],
  })
export class ProductsModule {}
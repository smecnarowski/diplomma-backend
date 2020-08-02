import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthModule } from './auth/auth.module';
import { EnergyConsumptionModule } from './energy-consumption/energy-consumption.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TasksService } from './tasks.service';
import { RatesModule } from './rates/rates.module';
import { ProductsModule } from './products/products.module';
import { MathsModule } from './maths/maths.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist/spa')
    }),
    AuthModule,
    EnergyConsumptionModule,
    UsersModule,
    DatabaseModule,
    RatesModule,
    ProductsModule,
    MathsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService]
})
export class AppModule {}

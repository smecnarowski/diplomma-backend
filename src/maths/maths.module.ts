import { Module } from '@nestjs/common';
import { MathsController } from './maths.controller';

@Module({
  controllers: [MathsController]
})
export class MathsModule {}

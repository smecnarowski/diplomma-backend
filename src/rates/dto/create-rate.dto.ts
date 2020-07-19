import { IsString, IsDecimal } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRateDto {
  @IsString()
  @Transform(currency => currency.toUpperCase())
  readonly currency: string;

  @IsDecimal()
  readonly rate: number;
}
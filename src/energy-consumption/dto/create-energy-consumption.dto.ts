import { IsString, IsDecimal } from 'class-validator';

export class CreateEnergyConsumptionDto {
  @IsString()
  readonly countryName: string;

  @IsDecimal()
  readonly consumption: number;

  @IsString()
  readonly locale: string;
}
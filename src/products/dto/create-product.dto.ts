import { IsString, IsEnum, IsNumber, IsOptional, Validate } from 'class-validator';
import { CurrencyExist } from 'src/components/validators/CurrencyExists.validator';

enum TypesEnum {
  Module   = <any>"module",
  Inverter  = <any>"inverter"
}

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsEnum(TypesEnum)
  readonly type: string;

  @IsString()
  @IsOptional()
  owner: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  @Validate(CurrencyExist)
  readonly currency: string;
}
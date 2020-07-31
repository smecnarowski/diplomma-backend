import { IsString, IsEnum, IsNumber, IsOptional, Validate, IsUrl, ValidateNested } from 'class-validator';
import { CurrencyExist } from 'src/components/validators/CurrencyExists.validator';
import { ProductParameter } from './product-parameter.dto';
import { Type } from 'class-transformer';

enum TypesEnum {
  Module   = <any>"module",
  Inverter = <any>"inverter"
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

  @IsNumber()
  readonly power: number;

  @IsString()
  @Validate(CurrencyExist)
  readonly currency: string;

  @IsString()
  readonly description: string;

  @IsUrl({
    protocols: ['https'],
    require_protocol: true
  })
  @IsOptional()
  readonly img: string;

  @ValidateNested({ each: true })
  @Type(() => ProductParameter)
  readonly parameters: ProductParameter[];
}
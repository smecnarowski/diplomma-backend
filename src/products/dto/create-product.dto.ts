import { IsString, IsEnum, IsNumber, IsOptional, Validate, IsUrl, ValidateNested } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { CurrencyExist } from 'src/components/validators/CurrencyExists.validator';
import { ProductParameter } from './product-parameter.dto';
import { Type } from 'class-transformer';

enum TypesEnum {
  Module   = <any>"module",
  Inverter = <any>"inverter"
}

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsEnum(TypesEnum)
  @ApiProperty()
  readonly type: string;

  @IsString()
  @IsOptional()
  @ApiHideProperty()
  owner?: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @ApiProperty()
  readonly power: number;

  @IsString()
  @Validate(CurrencyExist)
  @ApiProperty()
  readonly currency: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsUrl({
    protocols: ['https'],
    require_protocol: true
  })
  @IsOptional()
  @ApiProperty()
  readonly img?: string;

  @ValidateNested({ each: true })
  @Type(() => ProductParameter)
  @ApiProperty({ type: () => [ProductParameter] })
  readonly parameters: ProductParameter[];
}
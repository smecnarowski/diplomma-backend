import { IsString, IsEmail, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @Transform(username => username.toLowerCase())
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isAdmin?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isManufacturer?: boolean;
}
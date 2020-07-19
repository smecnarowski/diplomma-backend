import { IsString, IsEmail, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(username => username.toLowerCase())
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isAdmin: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isManufacturer: boolean;
}
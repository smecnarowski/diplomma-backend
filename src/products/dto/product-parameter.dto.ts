import { IsString } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ProductParameter {
    @IsString()
    @ApiProperty()
    readonly name: string;
    
    @IsString()
    @ApiProperty()
    readonly unit: string;
    
    @Transform(String)
    @IsString()
    @ApiProperty()
    readonly value: string;
}
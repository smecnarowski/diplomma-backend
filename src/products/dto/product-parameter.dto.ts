import { IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ProductParameter {
    @IsString()
    readonly name: string;
    
    @IsString()
    readonly unit: string;
    
    @Transform(String)
    @IsString()
    readonly value: string;
}
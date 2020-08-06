import { Module } from "@nestjs/common";
import { CurrencyExist } from "./CurrencyExists.validator";

@Module({
    imports: [],
    providers: [CurrencyExist]
})
export class ValidatorModule {}
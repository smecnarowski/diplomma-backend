import { ValidatorConstraint, ValidationArguments} from "class-validator";
import { RatesService } from "src/rates/rates.service";
import {Injectable, Inject} from '@nestjs/common';

@ValidatorConstraint({ name: 'CurrencyExist', async: true })
@Injectable()
export class CurrencyExist {
  constructor(
    @Inject('RatesService') private readonly ratesService: RatesService,
  ) {}

  async validate(currency: string, args: ValidationArguments) {
    const rate = await this.ratesService.getByCurrency(currency);

    return !!rate
  }

  defaultMessage(args: ValidationArguments) {
    return 'Currency not exists.';
  }
}

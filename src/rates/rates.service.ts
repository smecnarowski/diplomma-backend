import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Rate } from './interfaces/rate.interface';
import { CreateRateDto } from './dto/create-rate.dto';

@Injectable()
export class RatesService {
  constructor(
    @Inject('RATE_MODEL') 
    private rateModel: Model<Rate>
  ) {}

  async create(createRateDto: CreateRateDto): Promise<Rate> {
    const existingRate = await this.rateModel.findOne({ currency: createRateDto.currency.toUpperCase() })
    if (existingRate) {
      existingRate.rate = createRateDto.rate
      return existingRate.save()
    }

    const createdRate = new this.rateModel(createRateDto)
    return createdRate.save()
  }

  async findAll(): Promise<Rate[]> {
    return this.rateModel.find().exec();
  }

  async getByCurrency(currency: string): Promise<Rate> {
    return this.rateModel.findOne({ currency: currency.toUpperCase() })
  }
}
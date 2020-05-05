import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { EnergyConsumption } from './interfaces/energy-consumption.interface';
import { CreateEnergyConsumptionDto } from './dto/create-energy-consumption.dto';

@Injectable()
export class EnergyConsumptionService {
  constructor(
    @Inject('ENERGY_CONSUMPTION_MODEL') 
    private energyConsumptionModel: Model<EnergyConsumption>
  ) {}

  async create(createEnergyConsumptionDto: CreateEnergyConsumptionDto): Promise<EnergyConsumption> {
    const createdCat = new this.energyConsumptionModel(createEnergyConsumptionDto);
    return createdCat.save();
  }

  async findAll(): Promise<EnergyConsumption[]> {
    return this.energyConsumptionModel.find().exec();
  }

  async getByName(countryName: string): Promise<EnergyConsumption> {
    return this.energyConsumptionModel.findOne({ countryName: countryName.toUpperCase() })
  }
}
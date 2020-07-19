
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { RatesService } from 'src/rates/rates.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL') 
    private productModel: Model<Product>,
    private readonly ratesService: RatesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto)
    const rate = await this.ratesService.getByCurrency(createProductDto.currency)

    createdProduct.currency = rate._id
    return createdProduct.save()
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('currency').exec();
  }

  async getById(id: string): Promise<Product | undefined> {
    return this.productModel.findOne({ _id: id })
  }

  async deleteById(id: string): Promise<Product | undefined> {
    return this.productModel.findByIdAndDelete(id)
  }

  async getByOwner(ownerId: string): Promise<Product> {
    return this.productModel.findOne({ owner: ownerId })
  }
}
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL') 
    private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    const created = new this.userModel(createUserDto)
    return created.save()
  }

  async getManufacturers(): Promise<User[]> {
    return this.userModel.find({ isManufacturer: true }).populate('products').exec()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username.toLowerCase() })
  }

  async addProductToUser(username: string, productId: string): Promise<User | undefined> {
    const user = await this.findOne(username)
    user.products.push(productId)

    return user.save()
  }

  async deleteProductFromUser(username: string, productId: string): Promise<User | undefined> {
    const user = await this.findOne(username)
    user.products = user.products.filter(product => product !== productId)

    return user.save()
  }
}
import { Controller, Request, Post, UseGuards, Get, UseInterceptors, UploadedFile, Param, NotFoundException, Body, UnauthorizedException, Delete } from '@nestjs/common';
import * as Papa from 'papaparse';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EnergyConsumptionService } from './energy-consumption/energy-consumption.service';
import { CreateEnergyConsumptionDto } from './energy-consumption/dto/create-energy-consumption.dto';
import { CreateUserDto } from './users/dto/create-user.dto'
import { RatesService } from './rates/rates.service';
import { UsersService } from './users/users.service';
import { CreateProductDto } from './products/dto/create-product.dto';
import { ProductsService } from './products/products.service';
import { ParseObjectIdPipe } from './components/pipes/ParseObjectId.pipe';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService, 
    private energyConsumptionService: EnergyConsumptionService,
    private ratesService: RatesService,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  addUser(@Request() req, @Body() createUserDto: CreateUserDto) {
    if (!req.user.isAdmin) {
      throw new UnauthorizedException()
    }

    this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async addProduct(@Request() req, @Body() createProductDto: CreateProductDto) {
    if (!req.user.isManufacturer) {
      throw new UnauthorizedException()
    }

    createProductDto.owner = req.user._id
    const createdProduct = await this.productsService.create(createProductDto)
    await this.usersService.addProductToUser(req.user.username, createdProduct._id)

    return createdProduct
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:productId')
  async delProduct(@Request() req, @Param('productId', new ParseObjectIdPipe()) productId: string) {
    if (!req.user.isManufacturer) {
      throw new UnauthorizedException()
    }

    const product = await this.productsService.getById(productId)
    if (!product) {
      throw new NotFoundException()
    }
    const validProducts = req.user.products.filter(val => {
      return val.toString() === productId
    })
    if (validProducts.length === 0) {
      throw new UnauthorizedException()
    }
    
    this.productsService.deleteById(productId)
    this.usersService.deleteProductFromUser(req.user.username, productId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('energy-consumptions')
  @UseInterceptors(FileInterceptor('file'))
  importEnergyConsuption(@UploadedFile() file) {
    let csv = file.buffer.toString();
    if (csv.charCodeAt(0) === 0xFEFF) {
      csv = csv.slice(1);
    }
    const entries = Papa.parse(csv, { header: true, delimiter: ';', dynamicTyping: true });
    entries.data.forEach(element => {
      this.energyConsumptionService.create(<CreateEnergyConsumptionDto> element)
    });
  }

  @Get('energy-consumptions/:countryName')
  async getCountryEnergyConsumption(@Param('countryName') countryName) {
    const consumption = await this.energyConsumptionService.getByName(countryName);
    if (!consumption) {
      throw new NotFoundException()
    }

    return consumption
  }

  @Get('rates')
  async getRates() {
    const rates = await this.ratesService.findAll()
    return Object.assign({}, ...rates.map(rate => ({[rate.currency]: rate.rate})))
  }

  @Get('manufacturers')
  async getManufacturers() {
    const manufacturers = await this.usersService.getManufacturers()
    return manufacturers.map(manufacturer => {
      const data = {
        _id: manufacturer._id,
        name: manufacturer.name,
        products: {
          inverters: 0,
          modules: 0,
        },
      }
      manufacturer.products.forEach(product => {
        switch (product.type) {
          case 'inverter': 
            data.products.inverters++
            break
          case 'module':
            data.products.modules++
            break
        }
      })

      return data
    })
  }

  @Get('manufacturers/:id')
  async getManufacturerWithProducts(@Param('id', new ParseObjectIdPipe()) id: string) {
    let user = await this.usersService.findOneById(id)
    if (!user || !user.isManufacturer) {
      throw new NotFoundException()
    }
    let { __v, isAdmin, isManufacturer, password, username, ...manufacturer } = user.toObject()

    manufacturer.products = user.products.map(product => {
      const { __v, currency, owner, ...data } = product.toObject()
      data.priceCurrency = currency.currency
      return data;
    })
    
    return manufacturer
  }
}

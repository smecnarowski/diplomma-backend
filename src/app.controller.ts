import { Controller, Request, Post, UseGuards, Get, UseInterceptors, UploadedFile, Param, NotFoundException, ClassSerializerInterceptor } from '@nestjs/common';
import * as Papa from 'papaparse';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { EnergyConsumptionService } from './energy-consumption/energy-consumption.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private energyConsumptionService: EnergyConsumptionService) {}

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
  @Post('energy-consumption')
  @UseInterceptors(FileInterceptor('file'))
  importEnergyConsuption(@UploadedFile() file) {
    let csv = file.buffer.toString();
    if (csv.charCodeAt(0) === 0xFEFF) {
      csv = csv.slice(1);
    }
    const entries = Papa.parse(csv, { header: true, delimiter: ';', dynamicTyping: true });
    entries.data.forEach(element => {
      this.energyConsumptionService.create(element)
    });
  }

  @Get('energy-consumption/:countryName')
  async getCountryEnergyConsumption(@Param('countryName') countryName) {
    const consumption = await this.energyConsumptionService.getByName(countryName);
    console.log(consumption)
    if (!consumption) {
      throw new NotFoundException()
    }

    return consumption
  }
}

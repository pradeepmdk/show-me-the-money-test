import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller('/api/1.0/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('balanceSheet')
  async getBalanceSheet() {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet',
      );
      return data;
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}

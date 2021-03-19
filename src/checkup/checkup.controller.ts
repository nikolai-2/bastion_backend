import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
export class CheckupController {

  @Get('{date}/getList')
  async getList(@Param('date') date: string) {

  }
}

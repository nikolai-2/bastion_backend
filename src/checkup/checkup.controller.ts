import { Controller, Get, Param, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
export class CheckupController {
  constructor(private checkupService:CheckupService){}

  @Get('{date}/getList')
  async getList(@Request() req,@Param('date') date: string) {
    var d = new Date(date)
    d.setHours(0,0,0,0) 
    return await this.checkupService.getList(req.user,d)
  }
}

import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';
import { CheckupItemDto } from './checkup-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
export class CheckupController {
  constructor(private checkupService: CheckupService) {}

  @Get(':date/getList')
  async getList(
    @Request() req,
    @Param('date') date: string,
  ): Promise<CheckupItemDto[]> {
    return await this.checkupService.getList(req.user, date);
  }
}

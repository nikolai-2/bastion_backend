import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CheckupService } from './checkup.service';
import { ScheduleShiftPatternExtendType } from '../schedule-shift-pattern/schedule-shift-pattern-extend.type';

@UseGuards(JwtAuthGuard)
@Controller('checkup')
export class CheckupController {
  constructor(private checkupService: CheckupService) {}

  @Get(':date/getList')
  async getList(
    @Request() req,
    @Param('date') date: string,
  ): Promise<ScheduleShiftPatternExtendType[]> {
    return await this.checkupService.getList(req.user, date);
  }
}

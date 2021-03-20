import { Module } from '@nestjs/common';
import { ScheduleShiftPatternService } from './schedule-shift-pattern.service';

@Module({
  providers: [ScheduleShiftPatternService],
  exports: [ScheduleShiftPatternService],
})
export class ScheduleShiftPatternModule {}

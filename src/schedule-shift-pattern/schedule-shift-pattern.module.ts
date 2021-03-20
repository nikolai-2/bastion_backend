import { Module } from '@nestjs/common';
import { ScheduleShiftPatternService } from './schedule-shift-pattern.service';
import { ScheduleShiftPatternController } from './schedule-shift-pattern.controller';

@Module({
  providers: [ScheduleShiftPatternService],
  exports: [ScheduleShiftPatternService],
  controllers: [ScheduleShiftPatternController],
})
export class ScheduleShiftPatternModule {}

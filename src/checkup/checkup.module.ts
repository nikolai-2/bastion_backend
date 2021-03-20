import { Module } from '@nestjs/common';
import { CheckupController } from './checkup.controller';
import { CheckupService } from './checkup.service';
import { ScheduleShiftPatternModule } from '../schedule-shift-pattern/schedule-shift-pattern.module';
import { ShiftZoneModule } from '../shift-zone/shift-zone.module';
@Module({
  imports: [ScheduleShiftPatternModule, ShiftZoneModule],
  controllers: [CheckupController],
  providers: [CheckupService],
})
export class CheckupModule {}

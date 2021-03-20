import { Module } from '@nestjs/common';
import { CheckupController } from './checkup.controller';
import { CheckupService } from './checkup.service';
import { ScheduleShiftPatternModule } from '../schedule-shift-pattern/schedule-shift-pattern.module';
@Module({
  imports: [ScheduleShiftPatternModule],
  controllers: [CheckupController],
  providers: [CheckupService],
})
export class CheckupModule {}

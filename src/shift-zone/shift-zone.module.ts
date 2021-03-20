import { Module } from '@nestjs/common';
import { ShiftZoneService } from './shift-zone.service';

@Module({
  providers: [ShiftZoneService],
  exports: [ShiftZoneService],
})
export class ShiftZoneModule {}

import { ApiProperty } from '@nestjs/swagger';
import { ScheduleShiftPattern, User, ShiftZone } from '@prisma/client';
import { PlaceExtendType } from '../place/place-extend.type';


export type ScheduleShiftPatternExtendType = ScheduleShiftPattern & {
  Place?: PlaceExtendType;
  User?: User;
  ShiftZone?: ShiftZone[];
};

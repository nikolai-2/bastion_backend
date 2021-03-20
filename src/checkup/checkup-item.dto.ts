import { ScheduleShiftPatternExtendType } from '../schedule-shift-pattern/schedule-shift-pattern-extend.type';
import { Prisma, User, ShiftZone } from '.prisma/client';
import { PlaceExtendType } from 'src/place/place-extend.type';

export class CheckupItemDto implements ScheduleShiftPatternExtendType {
  id: number;
  user_id: number;
  place_id: number;
  date: Date;
  repeat_when: Prisma.JsonValue;
  Place?: PlaceExtendType;
  User?: User;
  ShiftZone?: ShiftZone[];
}

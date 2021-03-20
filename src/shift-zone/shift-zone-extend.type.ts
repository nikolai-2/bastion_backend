import { ScheduleShiftPattern, ShiftZone, Zone } from '@prisma/client';

export type ShiftZoneExtendType = ShiftZone & {
  ScheduleShiftPattern?: ScheduleShiftPattern;
  Zone?: Zone;
};

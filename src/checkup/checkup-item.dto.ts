import { ScheduleShiftPatternExtendType } from '../schedule-shift-pattern/schedule-shift-pattern-extend.type';
import { Prisma, User, ShiftZone, Zone } from '.prisma/client';
import { PlaceExtendType } from 'src/place/place-extend.type';
import { ApiProduces, ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from '@nestjs/common';


export class CheckupItemDto implements ScheduleShiftPatternExtendType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  place_id: number;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  repeat_when: Prisma.JsonValue;
  @ApiProperty({})
  Place?: PlaceExtendType;
  @ApiProperty()
  User?: User;
  @ApiProperty()
  ShiftZone?: ShiftZone[];
}


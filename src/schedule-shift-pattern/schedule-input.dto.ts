import { IsArray, IsDate, IsNumber } from 'class-validator';

export class ScheduleInputDto {
  @IsNumber()
  guard_id: number;

  @IsNumber()
  place_id: number;

  @IsDate()
  date: Date;

  @IsArray()
  repeat_when: number[];
}

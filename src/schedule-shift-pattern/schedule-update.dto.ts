import { IsArray, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleUpdateDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  guard_id: number;

  @ApiProperty()
  @IsNumber()
  place_id: number;

  @ApiProperty()
  @IsDate()
  date: Date;

  @IsArray()
  @ApiProperty({ type: [Number] })
  repeat_when: number[];
}

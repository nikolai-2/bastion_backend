import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CheckedInputDto {
  @IsNumber()
  @ApiProperty({ example: 15 })
  schedule_shift_id: number;

  @IsString()
  @ApiProperty({ example: '12:34:56:78:90:12:34' })
  zone_id: string;

  @IsString()
  @ApiProperty({ example: 'Comment' })
  comment: string;
}

import { IsNumber, IsString } from 'class-validator';

export class CheckedInputDto {
  @IsNumber()
  schedule_shift_id: number;

  @IsString()
  zone_id: string;
}

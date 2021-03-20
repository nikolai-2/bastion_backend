import { IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNumber()
  shift_zone_record_id: number;

  @IsString()
  comment: string;
}

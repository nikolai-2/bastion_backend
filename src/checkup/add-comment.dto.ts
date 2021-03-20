import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNumber()
  @ApiProperty({example:15})
  shift_zone_record_id: number;

  @IsString()
  @ApiProperty({example:"Allright. Go to home."})
  comment: string;
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginTagDto {
  @IsString()
  @ApiProperty()
  tag_id: string;
}

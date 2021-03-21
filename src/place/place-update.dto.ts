import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ZoneInputDto {
  @IsString()
  @ApiProperty({ example: 1 })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Mother room' })
  name: string;
}

export class PlaceUpdateDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: 'Place for buhich' })
  place_name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => ZoneInputDto)
  @ApiProperty({ type: [ZoneInputDto] })
  zones: ZoneInputDto[];
}

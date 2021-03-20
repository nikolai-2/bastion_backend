import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PlaceInputDto {
  @IsString()
  place_name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(() => ZoneInputDto)
  zones: ZoneInputDto[];
}

export class ZoneInputDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { PlaceInputDto } from './place-input.dto';

@Controller('place')
@ApiTags('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Get('get')
  @ApiOperation({ summary: 'Возвращает объект охраны' })
  getPlace() {
    return this.placeService.getPlace();
  }

  @Post('create')
  @ApiOperation({ summary: 'Создает новый объект охраны' })
  async createPlace(@Body() placeInputDto: PlaceInputDto) {
    return this.placeService.createPlace({
      name: placeInputDto.place_name,
      Zone: {
        create: placeInputDto.zones,
      },
    });
  }

  @Get('remove')
  @ApiOperation({ summary: 'Удаляет объект охраны' })
  removePlace() {
    return this.placeService.removePlace();
  }
}

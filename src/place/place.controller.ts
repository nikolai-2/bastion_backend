import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { PlaceInputDto } from './place-input.dto';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';

@Controller('place')
@ApiTags('place')
@UseGuards(RolesGuard)
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @Roles(Role.Guard,Role.Boss)
  @Get('get')
  @ApiOperation({ summary: 'Возвращает объект охраны' })
  getPlace() {
    return this.placeService.getPlace();
  }

  @Roles(Role.Boss)
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

  @Roles(Role.Boss)
  @Get('remove')
  @ApiOperation({ summary: 'Удаляет объект охраны' })
  removePlace() {
    return this.placeService.removePlace();
  }
}

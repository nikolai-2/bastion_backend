import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { PlaceInputDto } from './place-input.dto';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaceUpdateDto } from './place-update.dto';
import { ZoneService } from '../zone/zone.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('place')
@ApiTags('place')
@UseGuards(JwtAuthGuard)
export class PlaceController {
  private readonly logger = new Logger(PlaceController.name);
  constructor(
    private placeService: PlaceService,
    private zoneService: ZoneService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get('getList')
  @ApiOperation({ summary: 'Возвращает объект охраны' })
  getList() {
    /*this.logger.log()*/
    return this.placeService.getPlace();
  }

  @Roles(Role.Boss)
  @Post('create')
  @ApiProperty({ type: PlaceInputDto })
  @ApiOperation({ summary: 'Создает новый объект для охраны' })
  async createPlace(@Body() placeInputDto: PlaceInputDto) {
    this.logger.log(placeInputDto, 'create');
    return this.placeService.createPlace({
      name: placeInputDto.place_name,
      Zone: {
        create: placeInputDto.zones,
      },
    });
  }

  @Post('update')
  @ApiProperty({ type: PlaceUpdateDto })
  @ApiOperation({ summary: 'Обновляет объект' })
  async updatePlace(@Body() placeUpdate: PlaceUpdateDto) {
    await this.zoneService.deleteZones({
      place_id: placeUpdate.id,
    });

    return this.placeService.updatePlace({
      where: {
        id: placeUpdate.id,
      },
      data: {
        name: placeUpdate.place_name,
        Zone: {
          upsert: placeUpdate.zones.map((value) => {
            return {
              where: {
                id: value.id,
              },
              update: value,
              create: value,
            };
          }),
        },
      },
    });
  }

  /*
  @Roles(Role.Boss)
  @Get('remove')
  @ApiOperation({ summary: 'Удаляет объект охраны' })
  removePlace() {
    return this.placeService.removePlace();
  }
  */
}

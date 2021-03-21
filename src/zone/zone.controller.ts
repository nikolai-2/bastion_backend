import { Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ZoneService } from './zone.service';

@Controller('zone')
@ApiTags('zone')
export class ZoneController {
  private readonly logger = new Logger(ZoneController.name);
  constructor(private zoneService: ZoneService) {}

  /*@Get('get')
  @ApiOperation({summary:"Возвращает метку"})
  get() {
    return this.zoneService.get();
  }

  @Post('check')
  @ApiOperation({summary:"Помечает метку как отмеченную"})
  checkZone() {
    return this.zoneService.check();
  }*/
}

import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZoneService } from './zone.service';

@Controller('zone')
@ApiTags('zone')
export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  @Get('get')
  get() {
    return this.zoneService.get();
  }

  @Post('check')
  checkZone() {
    return this.zoneService.check();
  }
}

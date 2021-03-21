import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { ZoneModule } from '../zone/zone.module';

@Module({
  imports: [ZoneModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}

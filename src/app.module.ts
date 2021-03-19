import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlaceModule } from './place/place.module';
import { ZoneService } from './zone/zone.service';
import { ZoneModule } from './zone/zone.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule,PlaceModule,ZoneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

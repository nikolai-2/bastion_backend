import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlaceModule } from './place/place.module';
import { ZoneModule } from './zone/zone.module';
import { CheckupModule } from './checkup/checkup.module';
import { ScheduleShiftPatternModule } from './schedule-shift-pattern/schedule-shift-pattern.module';
import { ShiftZoneModule } from './shift-zone/shift-zone.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ScheduleTaskModule } from './schedule/schedule-task.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    PlaceModule,
    ZoneModule,
    CheckupModule,
    ScheduleShiftPatternModule,
    ShiftZoneModule,
    FirebaseModule,
    ScheduleTaskModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

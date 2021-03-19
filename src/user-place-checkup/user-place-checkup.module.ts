import { Module } from '@nestjs/common';
import { UserPlaceCheckupService } from './user-place-checkup.service';

@Module({
  providers: [UserPlaceCheckupService]
})
export class UserPlaceCheckupModule {}

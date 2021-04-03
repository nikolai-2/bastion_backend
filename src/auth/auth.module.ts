import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'nikolay_2_backdoor',
      signOptions: { expiresIn: '1d' },
    }),
    EventEmitterModule.forRoot({}),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

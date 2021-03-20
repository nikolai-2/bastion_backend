import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './user-login.dto';
import { LoginResponseInterface } from './login-response.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Возвращает токен для отправки запросов серверу',
    responses: {},
  })
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Request() req): Promise<LoginResponseInterface> {
    return this.authService.getToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  async getUser(@Request() req) {
    const user: User = req.user;
    const { name, avatar_src, role, ...o } = user;
    return {
      name: name,
      avatar_src: avatar_src,
      role: role,
    };
  }
}

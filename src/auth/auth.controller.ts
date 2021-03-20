import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './user-login.dto';
import { LoginResponseInterface } from './login-response.interface';

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
}

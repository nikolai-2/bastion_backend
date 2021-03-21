import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';
import { UserLoginDto } from './user-login.dto';
import { LoginResponseInterface } from './login-response.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '@prisma/client';
import { smallUser } from './smallUser.dto';
import { LoginTagDto } from './login-tag.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Возвращает токен для отправки запросов серверу',
    responses: {},
  })
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Request() req): Promise<LoginResponseInterface> {
    this.logger.log(req.user, 'login');
    return this.authService.getToken(req.user);
  }

  @Post('loginByTag')
  @ApiProperty({ type: LoginTagDto })
  async loginByTag(@Body() loginTagDto: LoginTagDto) {
    return this.authService.getToken(
      await this.authService.loginByTag(loginTagDto.tag_id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by token' })
  @ApiOkResponse({ type: smallUser })
  @Get('getUser')
  async getUser(@Request() req) {
    this.logger.log(req.user, 'getUser');
    const user: User = req.user;
    const { name, avatar_src, role, ...o } = user;
    return {
      name: name,
      avatar_src: avatar_src,
      role: role,
    };
  }
}

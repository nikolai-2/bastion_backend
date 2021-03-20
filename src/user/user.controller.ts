import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { smallUser } from 'src/auth/smallUser.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiTags("user")
export class UserController {
  private readonly  logger = new Logger(UserController.name)
  constructor(private userService: UserService) {}

  @ApiOperation({summary:"Получить всех пользователей одной роли"})
  @ApiOkResponse({type:[smallUser]})
  @Get('getByRole/:role')
  async getByRole(@Param('role') role: string) {
    this.logger.log(role,'getByRole')
    const users = await this.userService.users({
      role: role,
    });

    return users.map((user) => {
      return {
        name: user.name,
        avatar_src: user.avatar_src,
        role: user.role,
      };
    });
  }
}

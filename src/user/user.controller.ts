import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('getByRole/:role')
  async getByRole(@Param('role') role: string) {
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

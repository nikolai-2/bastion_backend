import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userService.user({
      login: username,
    });

    if (user && user.password_hash === password) return user;

    return null;
  }
}

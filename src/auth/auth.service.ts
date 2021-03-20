import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseInterface } from './login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userService.user({
      login: username,
    });

    if (user && user.password_hash === password) return user;

    return null;
  }

  async getToken(user: User): Promise<LoginResponseInterface> {
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

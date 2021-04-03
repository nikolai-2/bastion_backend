import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(whereUnique: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: whereUnique,
    });
  }

  async users(where: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where: where,
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: data,
    });
  }

  /*async updateUser(data: Prisma.UserUpdateInput);*/
}

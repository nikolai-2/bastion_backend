import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class CheckupService {
  getList(user: User, date: Date) {}
}

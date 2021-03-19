import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ZoneExtendType } from './zone-extend.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ZoneService {
  constructor(private prisma: PrismaService) {}

  get() {
    return 'Zone here';
  }

  check() {
    return 'Check yes';
  }

  async zone(params: {
    where: Prisma.ZoneWhereUniqueInput;
    include?: Prisma.ZoneInclude;
  }): Promise<ZoneExtendType> {
    const { where, include } = params;
    return this.prisma.zone.findUnique({
      where: where,
      include: include,
    });
  }
}

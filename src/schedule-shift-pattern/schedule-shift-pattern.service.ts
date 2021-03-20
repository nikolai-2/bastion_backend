import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ScheduleShiftPatternService {
  constructor(private prisma: PrismaService) {}

  async scheduleShiftPatterns(params: {
    where: Prisma.ScheduleShiftPatternWhereInput;
    include?: Prisma.ScheduleShiftPatternInclude;
  }) {
    const { where, include } = params;
    return this.prisma.scheduleShiftPattern.findMany({
      where: where,
      include: include,
    });
  }
}

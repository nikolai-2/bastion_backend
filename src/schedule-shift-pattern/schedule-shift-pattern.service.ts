import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ScheduleShiftPatternExtendType } from './schedule-shift-pattern-extend.type';

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

  async scheduleShiftPattern(params: {
    where: Prisma.ScheduleShiftPatternWhereUniqueInput;
    include?: Prisma.ScheduleShiftPatternInclude;
  }): Promise<ScheduleShiftPatternExtendType> {
    const { where, include } = params;
    return this.prisma.scheduleShiftPattern.findUnique({
      where: where,
      include: include,
    });
  }
}

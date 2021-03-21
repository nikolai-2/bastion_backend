import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ScheduleShiftPatternExtendType } from './schedule-shift-pattern-extend.type';
import { ApiTags } from '@nestjs/swagger';

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

  async createScheduleShiftPattern(
    data: Prisma.ScheduleShiftPatternCreateInput,
  ) {
    return this.prisma.scheduleShiftPattern.create({
      data: data,
    });
  }

  async updateScheduleShiftPattern(params: {
    where: Prisma.ScheduleShiftPatternWhereUniqueInput;
    data: Prisma.ScheduleShiftPatternUncheckedUpdateInput;
    include?: Prisma.ScheduleShiftPatternInclude;
  }) {
    const { where, data, include } = params;
    return this.prisma.scheduleShiftPattern.update({
      where: where,
      data: data,
      include: include,
    });
  }

  async deleteScheduleShiftPattern(
    where: Prisma.ScheduleShiftPatternWhereUniqueInput,
  ) {
    this.prisma.scheduleShiftPattern.delete({
      where: where,
    });
  }
}

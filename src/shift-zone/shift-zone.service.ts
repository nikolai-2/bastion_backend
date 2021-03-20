import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ShiftZoneExtendType } from './shift-zone-extend.type';

@Injectable()
export class ShiftZoneService {
  constructor(private prisma: PrismaService) {}

  async createShiftZone(
    data: Prisma.ShiftZoneCreateInput,
  ): Promise<ShiftZoneExtendType> {
    return this.prisma.shiftZone.create({
      data: data,
      include: {
        Zone: true,
        ScheduleShiftPattern: true,
      },
    });
  }

  async updateShiftZone(params: {
    where: Prisma.ShiftZoneWhereUniqueInput;
    data: Prisma.ShiftZoneUncheckedUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.shiftZone.update({
      where: where,
      data: data,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Place, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PlaceExtendType } from './place-extend.type';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  getPlace() {
    return this.prisma.place.findMany({
      include: {
        Zone: true,
        ScheduleShiftPattern: {
          include: {
            User: {
              select: {
                name: true,
                avatar_src: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  removePlace() {
    return 'Remove place';
  }

  async place(params: {
    where: Prisma.PlaceWhereUniqueInput;
    include?: Prisma.PlaceInclude;
  }): Promise<PlaceExtendType> {
    const { where, include } = params;
    return this.prisma.place.findUnique({
      where: where,
      include: include,
    });
  }

  createPlace(data: Prisma.PlaceCreateInput) {
    return this.prisma.place.create({
      data: data,
    });
  }

  async updatePlace(params: {
    where: Prisma.PlaceWhereUniqueInput;
    data: Prisma.PlaceUpdateInput;
  }): Promise<Place> {
    const { where, data } = params;
    return this.prisma.place.update({
      data,
      where,
      include: {
        Zone: true,
        ScheduleShiftPattern: {
          include: {
            User: true,
          },
        },
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PlaceExtendType } from './place-extend.type';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  getPlace() {
    return 'Place here';
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
}

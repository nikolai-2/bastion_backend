import { Place, Zone } from '@prisma/client';

export type ZoneExtendType = Zone & {
  Place?: Place;
};

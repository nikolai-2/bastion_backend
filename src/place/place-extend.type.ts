import { Place, /*UserPlaceCheckup,*/ Zone } from '@prisma/client';

export type PlaceExtendType = Place & {
  Zone?: Zone[];
};

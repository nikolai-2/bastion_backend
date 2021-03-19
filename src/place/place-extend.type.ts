import { Place, UserPlaceCheckup, Zone } from '@prisma/client';

export type PlaceExtendType = Place & {
  UserPlaceCheckup?: UserPlaceCheckup[];
  Zone?: Zone[];
};

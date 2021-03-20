import { User } from '@prisma/client';

export interface LoginResponseInterface {
  access_token: string;
  User: Pick<User, 'name' | 'avatar_src' | 'role'>;
}

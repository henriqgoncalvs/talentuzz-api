import { User } from '@prisma/client';

export type UserToken = {
  user: Pick<User, 'id' | 'email'>;
  access_token: string;
  refresh_token: string;
};

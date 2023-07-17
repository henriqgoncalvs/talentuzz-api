import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';

export class UserWithTokenEntity {
  constructor(partial: Partial<UserWithTokenEntity>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  user: UserEntity;

  @Expose()
  @ApiProperty()
  access_token: string;

  @Expose()
  @ApiProperty()
  refresh_token: string;
}

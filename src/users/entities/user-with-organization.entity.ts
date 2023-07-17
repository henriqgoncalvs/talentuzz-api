import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserEntity } from './user.entity';
import { OrganizationEntity } from '../../organization/entities/organization.entity';

export class UserWithOrganizationEntity extends UserEntity {
  constructor({
    organization,
    ...partial
  }: Partial<UserWithOrganizationEntity>) {
    super(partial);

    this.organization = new OrganizationEntity(organization);
  }

  @ApiProperty()
  @Expose()
  organization: OrganizationEntity;
}

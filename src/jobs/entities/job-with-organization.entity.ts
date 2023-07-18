import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrganizationEntity } from 'src/organization/entities/organization.entity';
import { JobEntity } from './job.entity';

export class JobWithOrganizationEntity extends JobEntity {
  constructor({
    organization,
    ...partial
  }: Partial<JobWithOrganizationEntity>) {
    super(partial);

    this.organization = new OrganizationEntity(organization);
  }

  @Expose()
  @ApiProperty()
  organization: OrganizationEntity;
}

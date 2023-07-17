import { JobEntity } from 'src/jobs/entities/job.entity';
import { OrganizationEntity } from './organization.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrganizationWithJobsEntity extends OrganizationEntity {
  constructor({ jobs, ...partial }: Partial<OrganizationWithJobsEntity>) {
    super(partial);

    this.jobs = jobs.map((job) => new JobEntity(job));
  }

  @Expose()
  @ApiProperty()
  jobs: JobEntity[];
}

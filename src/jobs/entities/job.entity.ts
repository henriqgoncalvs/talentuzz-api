import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@prisma/client';
import { Expose } from 'class-transformer';

export class JobEntity implements Job {
  constructor(partial: Partial<JobEntity>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  position: string;

  @Expose()
  @ApiProperty()
  info: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  department: string;

  @Expose()
  @ApiProperty()
  salaryRange: string;

  @Expose()
  @ApiProperty()
  employmentType: string;

  @Expose()
  @ApiProperty()
  experienceLevel: string;

  @Expose()
  @ApiProperty()
  organizationId: string;
}

import { Controller, Get, Param } from '@nestjs/common';
import { Job } from '@prisma/client';

@Controller('organization/:organizationId/jobs')
export class OrganizationJobs {
  // @Get()
  // getAllJobs(@Param('organizationId') organizationId: string): Promise<Job[]> {}
}

import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationWithJobs } from './types/organization-with-jobs.type';
import { OrganizationService } from './organization.service';
import { IsPublic } from 'src/common/decorators/public.decorator';

@Controller('organization/:organizationId/jobs')
export class OrganizationJobsController {
  constructor(private readonly organizationService: OrganizationService) {}

  @IsPublic()
  @Get()
  getAllJobs(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationWithJobs> {
    return this.organizationService.findOneWithJobs(organizationId);
  }
}

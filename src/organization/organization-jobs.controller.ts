import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { OrganizationWithJobsEntity } from './entities/organization-with-jobs.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('organization/:organizationId/jobs')
@ApiTags('Organization With Jobs')
export class OrganizationJobsController {
  constructor(private readonly organizationService: OrganizationService) {}

  @IsPublic()
  @Get()
  async getAllJobs(
    @Param('organizationId') organizationId: string,
  ): Promise<OrganizationWithJobsEntity> {
    return new OrganizationWithJobsEntity(
      await this.organizationService.findOneWithJobs(organizationId),
    );
  }
}

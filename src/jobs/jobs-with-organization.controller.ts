import { Controller, Get } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { JobWithOrganizationEntity } from './entities/job-with-organization.entity';

@Controller('jobs-with-organization')
@ApiTags('Organization With Jobs')
export class JobsWithOrganizationController {
  constructor(private readonly jobsService: JobsService) {}

  @IsPublic()
  @Get()
  async findAll(): Promise<JobWithOrganizationEntity[]> {
    const jobs = await this.jobsService.findAllWithOrganization();

    return jobs.map((job) => new JobWithOrganizationEntity(job));
  }
}

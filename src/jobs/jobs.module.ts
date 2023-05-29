import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './repositories/jobs.repository';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
  imports: [OrganizationModule],
})
export class JobsModule {}

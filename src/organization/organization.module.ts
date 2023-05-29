import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './repositories/organization.repository';
import { OrganizationJobsController } from './organization-jobs.controller';

@Module({
  controllers: [OrganizationController, OrganizationJobsController],
  providers: [OrganizationService, OrganizationRepository],
  exports: [OrganizationService],
})
export class OrganizationModule {}

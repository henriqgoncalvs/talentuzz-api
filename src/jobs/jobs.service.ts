import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsRepository } from './repositories/jobs.repository';
import { OrganizationService } from 'src/organization/organization.service';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(userId: string, createJobDto: CreateJobDto) {
    const organization = await this.organizationService.findByUserId(userId);

    return this.jobsRepository.create(organization.id, createJobDto);
  }

  findOne(id: string) {
    return this.jobsRepository.findOne(id);
  }

  findAll() {
    return this.jobsRepository.findAll();
  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobsRepository.update(id, updateJobDto);
  }

  remove(id: string) {
    return this.jobsRepository.delete(id);
  }
}

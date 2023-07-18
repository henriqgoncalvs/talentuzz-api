import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { Job } from '@prisma/client';
import { UpdateJobDto } from '../dto/update-job.dto';

@Injectable()
export class JobsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(organizationId: string, createJobDto: CreateJobDto): Promise<Job> {
    return this.prismaService.job.create({
      data: {
        ...createJobDto,
        organizationId,
      },
    });
  }

  findOne(id: string): Promise<Job> {
    return this.prismaService.job.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findAll(): Promise<Job[]> {
    return this.prismaService.job.findMany();
  }

  findAllWithOrganization() {
    return this.prismaService.job.findMany({
      include: {
        organization: true,
      },
    });
  }

  update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    return this.prismaService.job.update({
      where: {
        id,
      },
      data: updateJobDto,
    });
  }

  delete(id: string): Promise<Job> {
    return this.prismaService.job.delete({
      where: {
        id,
      },
    });
  }
}

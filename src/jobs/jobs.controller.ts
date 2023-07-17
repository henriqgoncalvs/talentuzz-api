import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { JobEntity } from './entities/job.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  async create(
    @Body() createJobDto: CreateJobDto,
    @GetCurrentUser('sub') userId: string,
  ) {
    return new JobEntity(await this.jobsService.create(userId, createJobDto));
  }

  @IsPublic()
  @Get()
  async findAll() {
    const jobs = await this.jobsService.findAll();

    return jobs.map((job) => new JobEntity(job));
  }

  @IsPublic()
  @ApiBearerAuth('access-token')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new JobEntity(await this.jobsService.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return new JobEntity(await this.jobsService.update(id, updateJobDto));
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}

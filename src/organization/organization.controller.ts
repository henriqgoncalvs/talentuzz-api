import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { OrganizationEntity } from './entities/organization.entity';

@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiBearerAuth('access-token')
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @GetCurrentUser('sub') userId,
  ) {
    return new OrganizationEntity(
      await this.organizationService.create(userId, createOrganizationDto),
    );
  }

  @IsPublic()
  @Get()
  async findAll() {
    const organizations = await this.organizationService.findAll();

    return organizations.map(
      (organization) => new OrganizationEntity(organization),
    );
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new OrganizationEntity(await this.organizationService.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return new OrganizationEntity(
      await this.organizationService.update(id, updateOrganizationDto),
    );
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}

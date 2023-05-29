import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '@prisma/client';

@Injectable()
export class OrganizationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.prismaService.organization.create({
      data: {
        ...createOrganizationDto,
        adminId: userId,
      },
    });
  }

  async findOne(id: string): Promise<Organization> {
    return await this.prismaService.organization.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: string): Promise<Organization> {
    return this.prismaService.organization.findFirstOrThrow({
      where: {
        adminId: userId,
      },
    });
  }

  async findAll(): Promise<Organization[]> {
    return await this.prismaService.organization.findMany();
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.prismaService.organization.update({
      where: {
        id,
      },
      data: updateOrganizationDto,
    });
  }

  async delete(id: string): Promise<Organization> {
    return this.prismaService.organization.delete({
      where: { id },
    });
  }
}

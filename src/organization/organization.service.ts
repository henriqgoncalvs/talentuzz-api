import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepository } from './repositories/organization.repository';
import { Organization } from '@prisma/client';
import { MessagesHelper } from 'src/common/helpers/messages.helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/common/errors/prisma-error';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  create(
    userId: string,
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationRepository.create(userId, createOrganizationDto);
  }

  async findOne(id: string): Promise<Organization> {
    try {
      return await this.organizationRepository.findOne(id);
    } catch {
      throw new NotFoundException(MessagesHelper.ORGANIZATION_NOT_FOUND);
    }
  }

  findAll(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      return this.organizationRepository.update(id, updateOrganizationDto);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException(MessagesHelper.ORGANIZATION_NOT_FOUND);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.organizationRepository.delete(id);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException(MessagesHelper.ORGANIZATION_NOT_FOUND);
      }
      throw error;
    }
  }
}

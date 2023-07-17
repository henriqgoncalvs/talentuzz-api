import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '@prisma/client';
import { Expose } from 'class-transformer';

export class OrganizationEntity implements Organization {
  constructor(partial: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  info: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  profileImage: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  adminId: string;
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string, userId: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: {
          create: {
            key: uploadResult.Key,
            url: uploadResult.Location,
          },
        },
      },
      include: {
        avatar: true,
      },
    });

    return updatedUser;
  }

  async deletePublicFile(fileId: string, userId: string) {
    const file = await this.prismaService.publicFile.findFirst({
      where: { id: fileId },
    });

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        avatar: {
          delete: true,
        },
      },
    });

    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise();
  }
}

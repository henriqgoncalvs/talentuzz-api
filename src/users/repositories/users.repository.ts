import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MessagesHelper } from 'src/common/helpers/messages.helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { PrismaError } from 'src/common/errors/prisma-error';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    return await this.prismaService.user
      .create({
        data: signUpDto,
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === PrismaError.UniqueConstraintFailed) {
            throw new ConflictException(MessagesHelper.EMAIL_EXIST);
          }
        }
        throw error;
      });
  }

  async findOneOrFail(
    id: string,
  ): Promise<Omit<User, 'password' | 'hashedRt'>> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          id,
        },
        select: {
          createdAt: true,
          email: true,
          id: true,
        },
      });

      return user;
    } catch {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }
  }

  async findByEmailOrFail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      return user;
    } catch {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }
  }

  async findAll(): Promise<Omit<User, 'password' | 'hashedRt'>[]> {
    return await this.prismaService.user.findMany({
      select: {
        createdAt: true,
        email: true,
        id: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<null> {
    await this.prismaService.user.delete({
      where: { id },
    });

    return;
  }
}

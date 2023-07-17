import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { MessagesHelper } from 'src/common/helpers/messages.helper';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtTokens } from './types/jwt-tokens.type';
import { PrismaError } from 'src/common/errors/prisma-error';
import { UserWithTokenEntity } from './entities/user-with-token.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<UserWithTokenEntity> {
    const user = new UserEntity(
      await this.prismaService.user.findUnique({
        where: {
          email: loginDto.email,
        },
      }),
    );

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.CREDENTIALS_INVALID);
    }

    const isPasswordValid = argon.verify(user.password, loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(MessagesHelper.CREDENTIALS_INVALID);
    }

    delete user.password;

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      user,
      ...tokens,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<UserWithTokenEntity> {
    const hash = await argon.hash(signUpDto.password);

    const user = new UserEntity(
      await this.prismaService.user
        .create({
          data: {
            email: signUpDto.email,
            password: hash,
          },
          select: {
            id: true,
            email: true,
          },
        })
        .catch((error) => {
          if (error.code === PrismaError.UniqueConstraintFailed) {
            throw new ConflictException(MessagesHelper.EMAIL_EXIST);
          }
          throw new BadRequestException();
        }),
    );

    const tokens = await this.getTokens(user.id, user.email);

    return { user, ...tokens };
  }

  async logout(userId: string): Promise<boolean> {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshAccessToken(
    userId: string,
    rt: string,
  ): Promise<Pick<JwtTokens, 'access_token'>> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException();

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException();

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('AT_SECRET'),
      expiresIn: '15m',
    });

    return { access_token };
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hashedRt = await argon.hash(rt);

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt,
      },
    });
  }

  private async getTokens(userId: string, email: string): Promise<JwtTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

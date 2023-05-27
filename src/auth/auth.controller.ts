import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { RtGuard } from 'src/common/guards/rt.guard';
import { JwtTokens } from './types/jwt-tokens.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @IsPublic()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @IsPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Pick<JwtTokens, 'access_token'>> {
    return this.authService.refreshAccessToken(userId, refreshToken);
  }
}

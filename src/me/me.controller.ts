import { Controller, Get, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserWithOrganizationEntity } from 'src/users/entities/user-with-organization.entity';
import { MessagesHelper } from 'src/common/helpers/messages.helper';

@Controller('auth/me')
@ApiTags('Me')
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  // Get current user information
  @Get()
  async findOne(@GetCurrentUser('sub') userId: string) {
    try {
      return new UserWithOrganizationEntity(
        await this.usersService.findOneWithOrganization(userId),
      );
    } catch {
      return new UnauthorizedException(MessagesHelper.USER_NOT_LOGGED);
    }
  }
}

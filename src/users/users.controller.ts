import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Express } from 'express';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() signUpDto: SignUpDto) {
    return new UserEntity(await this.usersService.create(signUpDto));
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @GetCurrentUser('sub') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(userId, file.buffer, file.originalname);
  }

  @Post('avatar/remove')
  async deleteAvatar(@GetCurrentUser('sub') userId: string) {
    return this.usersService.deleteAvatar(userId);
  }
}

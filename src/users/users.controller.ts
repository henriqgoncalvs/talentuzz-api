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
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Express } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() signUpDto: SignUpDto) {
    return this.usersService.create(signUpDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
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

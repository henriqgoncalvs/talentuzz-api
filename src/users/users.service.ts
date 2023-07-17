import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesService: FilesService,
  ) {}

  create(signUpDto: SignUpDto) {
    return this.usersRepository.create(signUpDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOneOrFail(id);
  }

  findOneWithOrganization(id: string) {
    return this.usersRepository.findOneWithOrganizationOrFail(id);
  }

  findByEmail(email: string) {
    return this.usersRepository.findByEmailOrFail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
      userId,
    );

    return avatar;
  }

  async deleteAvatar(userId: string) {
    const user = await this.findOne(userId);

    const fileId = user.avatar?.id;

    if (fileId) {
      await this.filesService.deletePublicFile(fileId, userId);
    }
  }
}

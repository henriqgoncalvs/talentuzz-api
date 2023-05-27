import { IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/common/helpers/messages.helper';

export class UpdateUserDto {
  @IsEmail(
    {},
    {
      message: MessagesHelper.EMAIL_VALID,
    },
  )
  @IsNotEmpty()
  email: string;
}

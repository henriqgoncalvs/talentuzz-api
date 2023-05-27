import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MessagesHelper } from 'src/common/helpers/messages.helper';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: MessagesHelper.EMAIL_VALID,
    },
  )
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

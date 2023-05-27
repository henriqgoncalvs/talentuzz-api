import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/common/helpers/messages.helper';
import { RegExHelper } from 'src/common/helpers/regex.helper';

export class SignUpDto {
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
  @Matches(RegExHelper.password)
  password: string;
}

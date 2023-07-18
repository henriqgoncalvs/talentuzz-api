import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.password)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  org_name: string;

  @IsNotEmpty()
  @IsString()
  org_email: string;

  @IsNotEmpty()
  @Length(5, 2000)
  org_info: string;

  @IsNotEmpty()
  @IsString()
  org_phone: string;

  @IsNotEmpty()
  @Length(2, 255)
  org_location: string;
}

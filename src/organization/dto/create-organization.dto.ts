import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(5, 2000)
  info: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @Length(2, 255)
  location: string;
}

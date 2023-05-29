import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { EmploymentTypeEnum } from '../enums/employment-type.enum';
import { ExperienceLevelEnum } from '../enums/experience-level.enum';
import { SalaryRangeEnum } from '../enums/salary-range.enum';

export class CreateJobDto {
  @IsNotEmpty()
  @Length(2, 255)
  position: string;

  @IsNotEmpty()
  @Length(5, 2000)
  info: string;

  @IsNotEmpty()
  @Length(2, 255)
  location: string;

  @IsNotEmpty()
  @Length(2, 255)
  department: string;

  @IsNotEmpty()
  @IsEnum(EmploymentTypeEnum)
  employmentType: string;

  @IsNotEmpty()
  @IsEnum(ExperienceLevelEnum)
  experienceLevel: string;

  @IsNotEmpty()
  @IsEnum(SalaryRangeEnum)
  salaryRange: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignUpCommandRequestDto {
  @ApiProperty({ default: 'test@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(64, { message: 'Password must be no more than 64 characters.' })
  password: string;

  @ApiProperty({ default: 'Danial' })
  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @ApiProperty({ default: 'Joe' })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;
}

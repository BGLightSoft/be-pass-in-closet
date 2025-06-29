import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LogInDto {
  @ApiProperty({ default: 'test@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(64, { message: 'Password must be no more than 64 characters.' })
  password: string;
}

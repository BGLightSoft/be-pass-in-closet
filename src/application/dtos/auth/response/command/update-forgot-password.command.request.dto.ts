import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateForgotPasswordCommandRequestDto {
  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(64, { message: 'Password must be no more than 64 characters.' })
  password: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(64, { message: 'Password must be no more than 64 characters.' })
  passwordAgain: string;

  @ApiProperty({ default: 'STZWP6' })
  @IsString({ message: 'Code' })
  forgotPasswordCode: string;
}

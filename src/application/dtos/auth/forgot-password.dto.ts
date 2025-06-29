import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ default: 'test@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty()
  email: string;
}

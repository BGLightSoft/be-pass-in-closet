import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordCommandResponseDto {
  @ApiProperty({ description: 'Forgot password token' })
  forgotPasswordToken: string;

  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(
    forgotPasswordToken: string,
    message: string = 'Password reset code sent to your email',
  ) {
    this.forgotPasswordToken = forgotPasswordToken;
    this.message = message;
  }
}

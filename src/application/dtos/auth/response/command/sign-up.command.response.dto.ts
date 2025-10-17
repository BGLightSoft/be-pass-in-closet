import { ApiProperty } from '@nestjs/swagger';

export class SignUpCommandResponseDto {
  @ApiProperty({ description: 'Sign-up verification token' })
  signUpVerifiedToken: string;

  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(
    signUpVerifiedToken: string,
    message: string = 'Verification code sent to your email',
  ) {
    this.signUpVerifiedToken = signUpVerifiedToken;
    this.message = message;
  }
}

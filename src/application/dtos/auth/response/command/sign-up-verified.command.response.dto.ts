import { ApiProperty } from '@nestjs/swagger';

export class SignUpVerifiedCommandResponseDto {
  @ApiProperty({
    description: 'Indicates if the account was successfully verified',
  })
  success: boolean;

  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(
    success: boolean,
    message: string = 'Account verified successfully',
  ) {
    this.success = success;
    this.message = message;
  }
}

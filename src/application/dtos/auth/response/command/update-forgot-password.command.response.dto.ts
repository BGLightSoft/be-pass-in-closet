import { ApiProperty } from '@nestjs/swagger';

export class UpdateForgotPasswordCommandResponseDto {
  @ApiProperty({
    description: 'Indicates if the password was successfully updated',
  })
  success: boolean;

  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(
    success: boolean,
    message: string = 'Password updated successfully',
  ) {
    this.success = success;
    this.message = message;
  }
}

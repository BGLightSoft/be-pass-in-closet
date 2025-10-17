import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountCommandResponseDto {
  @ApiProperty({
    description: 'Indicates if the account was successfully deleted',
  })
  success: boolean;

  @ApiProperty({ description: 'Deleted account ID' })
  accountId: string;

  @ApiProperty({ description: 'Response message' })
  message: string;

  constructor(
    success: boolean,
    accountId: string,
    message: string = 'Account deleted successfully',
  ) {
    this.success = success;
    this.accountId = accountId;
    this.message = message;
  }
}

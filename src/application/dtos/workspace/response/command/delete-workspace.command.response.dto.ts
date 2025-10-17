import { ApiProperty } from '@nestjs/swagger';

export class DeleteWorkspaceCommandResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  success: boolean;

  constructor(message: string, success: boolean = true) {
    this.message = message;
    this.success = success;
  }
}

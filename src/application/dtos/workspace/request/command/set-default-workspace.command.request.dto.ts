import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetDefaultWorkspaceCommandRequestDto {
  @ApiProperty({
    description: 'The workspace ID to set as default',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  workspaceId: string;
}

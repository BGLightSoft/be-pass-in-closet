import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorkspaceCommandRequestDto {
  @ApiProperty({
    description: 'Workspace name',
    example: 'My Personal Workspace',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}

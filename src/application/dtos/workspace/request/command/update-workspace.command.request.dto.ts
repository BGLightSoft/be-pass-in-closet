import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class UpdateWorkspaceCommandRequestDto {
  @ApiProperty({
    description: 'Workspace name',
    example: 'Updated Workspace Name',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Workspace active status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCredentialGroupCommandRequestDto {
  @ApiProperty({
    description: 'Credential group type name',
    example: 'Database',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  credentialGroupTypeName: string;

  @ApiProperty({
    description: 'Parent credential group ID (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  credentialGroupId?: string;

  @ApiProperty({
    description: 'Credential group name',
    example: 'Production Databases',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCredentialCommandRequestDto {
  @ApiProperty({
    description: 'Credential group ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  credentialGroupId: string;

  @ApiProperty({
    description: 'Credential name',
    example: 'Production Database',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Parameters object with key-value pairs',
    example: {
      email: 'burak@gmail.com',
      password: 'mySecurePassword123',
      link: 'https://example.com',
    },
    required: true,
  })
  @IsNotEmpty()
  @IsObject()
  parameters: Record<string, string>;
}

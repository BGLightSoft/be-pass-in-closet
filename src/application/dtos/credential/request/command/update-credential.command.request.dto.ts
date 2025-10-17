import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  IsObject,
} from 'class-validator';

export class UpdateCredentialCommandRequestDto {
  @ApiProperty({
    description: 'Credential name',
    example: 'Updated Credential Name',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    description: 'Credential active status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Parameters object with key-value pairs to update',
    example: {
      email: 'newemail@gmail.com',
      password: 'newPassword123',
    },
    required: false,
  })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, string>;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CredentialIndexDto {
  @ApiProperty({
    description: 'Credential ID',
    example: 'uuid-string',
  })
  @IsString()
  credentialId: string;

  @ApiProperty({
    description: 'New index position',
    example: 0,
  })
  @IsNumber()
  index: number;
}

export class UpdateCredentialOrderRequestDto {
  @ApiProperty({
    description: 'Array of credential IDs with their new index positions',
    type: [CredentialIndexDto],
    example: [
      { credentialId: 'uuid1', index: 0 },
      { credentialId: 'uuid2', index: 1 },
      { credentialId: 'uuid3', index: 2 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CredentialIndexDto)
  credentials: CredentialIndexDto[];
}

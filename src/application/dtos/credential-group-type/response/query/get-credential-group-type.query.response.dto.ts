import { ApiProperty } from '@nestjs/swagger';
import { CredentialGroupTypeModel } from 'src/domain/models/credential/credential-group-type.model';

export class GetCredentialGroupTypeQueryResponseDto {
  @ApiProperty({
    description: 'Credential group type ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Credential group type name',
    example: 'email',
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    description: 'Credential group type active status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  constructor(model: CredentialGroupTypeModel) {
    this.id = model.id!;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

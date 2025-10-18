import { ApiProperty } from '@nestjs/swagger';
import { CredentialParameterListModel } from 'src/domain/models/credential/credential-parameter-list.model';

export class GetCredentialParameterListQueryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  credentialGroupTypeId: string | null;

  @ApiProperty()
  name: string | null;

  @ApiProperty({
    description: 'Parameter configuration data (e.g., type, required, etc.)',
    example: { type: 'text', required: true, placeholder: 'Enter value' },
  })
  data: object | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: CredentialParameterListModel) {
    this.id = model.id!;
    this.credentialGroupTypeId = model.credentialGroupTypeId;
    this.name = model.name;
    this.data = model.data;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

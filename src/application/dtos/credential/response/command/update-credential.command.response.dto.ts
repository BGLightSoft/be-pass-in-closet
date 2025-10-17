import { ApiProperty } from '@nestjs/swagger';
import { CredentialModel } from 'src/domain/models/credential/credential.model';

export class UpdateCredentialCommandResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  credentialGroupId: string | null;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: CredentialModel) {
    this.id = model.id!;
    this.credentialGroupId = model.credentialGroupId;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

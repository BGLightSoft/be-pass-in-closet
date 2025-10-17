import { ApiProperty } from '@nestjs/swagger';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

export class CreateCredentialGroupCommandResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  credentialGroupTypeId: string | null;

  @ApiProperty()
  credentialGroupId: string | null;

  @ApiProperty()
  workspaceId: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(model: CredentialGroupModel) {
    this.id = model.id!;
    this.credentialGroupTypeId = model.credentialGroupTypeId;
    this.credentialGroupId = model.credentialGroupId;
    this.workspaceId = model.workspaceId;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

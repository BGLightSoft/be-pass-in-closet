import { ApiProperty } from '@nestjs/swagger';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

export class UpdateCredentialGroupCommandResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  credentialGroupTypeId: string | null;

  @ApiProperty({ required: false })
  credentialGroupTypeName?: string | null;

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

  @ApiProperty()
  credentialCount: number;

  @ApiProperty()
  totalCredentialCount: number;

  constructor(
    model: CredentialGroupModel,
    credentialCount: number = 0,
    totalCredentialCount: number = 0,
    credentialGroupTypeName?: string | null,
  ) {
    this.id = model.id!;
    this.credentialGroupTypeId = model.credentialGroupTypeId;
    this.credentialGroupTypeName = credentialGroupTypeName;
    this.credentialGroupId = model.credentialGroupId;
    this.workspaceId = model.workspaceId;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.credentialCount = credentialCount;
    this.totalCredentialCount = totalCredentialCount;
  }
}

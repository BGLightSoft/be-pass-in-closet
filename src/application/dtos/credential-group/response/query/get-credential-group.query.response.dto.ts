import { ApiProperty } from '@nestjs/swagger';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

export class GetCredentialGroupQueryResponseDto {
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

  @ApiProperty({ type: [GetCredentialGroupQueryResponseDto], required: false })
  children?: GetCredentialGroupQueryResponseDto[];

  constructor(
    model: CredentialGroupModel,
    children?: GetCredentialGroupQueryResponseDto[],
  ) {
    this.id = model.id!;
    this.credentialGroupTypeId = model.credentialGroupTypeId;
    this.credentialGroupId = model.credentialGroupId;
    this.workspaceId = model.workspaceId;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.children = children;
  }
}

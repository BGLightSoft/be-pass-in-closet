import { ApiProperty } from '@nestjs/swagger';
import { CredentialModel } from 'src/domain/models/credential/credential.model';

export class GetCredentialQueryResponseDto {
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

  @ApiProperty({ type: [Object], nullable: true })
  parameters?: any[];

  constructor(model: CredentialModel, parameters?: any[]) {
    this.id = model.id!;
    this.credentialGroupId = model.credentialGroupId;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.parameters = parameters;
  }
}

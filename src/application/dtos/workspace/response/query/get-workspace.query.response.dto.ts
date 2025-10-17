import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';

export class GetWorkspaceQueryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isDefault?: boolean;

  constructor(model: WorkspaceModel, isDefault?: boolean) {
    this.id = model.id!;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.isDefault = isDefault;
  }
}

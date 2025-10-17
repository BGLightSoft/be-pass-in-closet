import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceModel } from 'src/domain/models/workspace/workspace.model';

export class UpdateWorkspaceCommandResponseDto {
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

  constructor(model: WorkspaceModel) {
    this.id = model.id!;
    this.name = model.name;
    this.isActive = model.isActive;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}

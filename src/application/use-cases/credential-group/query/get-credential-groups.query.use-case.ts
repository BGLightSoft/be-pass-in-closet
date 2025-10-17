import { Injectable } from '@nestjs/common';
import { GetCredentialGroupsByWorkspaceQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-workspace.query.service';
import { GetCredentialGroupsByParentQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-parent.query.service';
import { GetCredentialGroupQueryResponseDto } from 'src/application/dtos/credential-group/response/query/get-credential-group.query.response.dto';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';

@Injectable()
export class GetCredentialGroupsQueryUseCase {
  constructor(
    private readonly getCredentialGroupsByWorkspaceQueryService: GetCredentialGroupsByWorkspaceQueryService,
    private readonly getCredentialGroupsByParentQueryService: GetCredentialGroupsByParentQueryService,
  ) {}

  public async execute(
    workspaceId: string,
  ): Promise<GetCredentialGroupQueryResponseDto[]> {
    try {
      // Get all credential groups for workspace
      const allGroups =
        await this.getCredentialGroupsByWorkspaceQueryService.execute(
          workspaceId,
        );

      // Build tree structure (only root groups)
      const rootGroups = allGroups.filter((group) => !group.credentialGroupId);

      // Recursively build children for each root group
      const groupsWithChildren = await Promise.all(
        rootGroups.map((group) => this.buildGroupTree(group, allGroups)),
      );

      return groupsWithChildren;
    } catch (error) {
      throw error;
    }
  }

  private async buildGroupTree(
    group: CredentialGroupModel,
    allGroups: CredentialGroupModel[],
  ): Promise<GetCredentialGroupQueryResponseDto> {
    // Find direct children
    const children = allGroups.filter((g) => g.credentialGroupId === group.id);

    // Recursively build children trees
    const childrenWithSubChildren = await Promise.all(
      children.map((child) => this.buildGroupTree(child, allGroups)),
    );

    return new GetCredentialGroupQueryResponseDto(
      group,
      childrenWithSubChildren.length > 0 ? childrenWithSubChildren : undefined,
    );
  }
}

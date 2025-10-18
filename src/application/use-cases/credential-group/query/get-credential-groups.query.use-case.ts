import { Injectable } from '@nestjs/common';
import { GetCredentialGroupsByWorkspaceQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-workspace.query.service';
import { GetCredentialGroupsByParentQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-parent.query.service';
import { GetCredentialGroupQueryResponseDto } from 'src/application/dtos/credential-group/response/query/get-credential-group.query.response.dto';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { CountCredentialsByGroupsQueryService } from 'src/application/services/credential/query/count-credentials-by-groups.query.service';

@Injectable()
export class GetCredentialGroupsQueryUseCase {
  constructor(
    private readonly getCredentialGroupsByWorkspaceQueryService: GetCredentialGroupsByWorkspaceQueryService,
    private readonly getCredentialGroupsByParentQueryService: GetCredentialGroupsByParentQueryService,
    private readonly countCredentialsByGroupsQueryService: CountCredentialsByGroupsQueryService,
  ) {}

  public async execute(
    workspaceId: string,
  ): Promise<GetCredentialGroupQueryResponseDto[]> {
    try {
      // Get all credential groups with credentialGroupType relation (single query with JOIN)
      const allGroups =
        await this.getCredentialGroupsByWorkspaceQueryService.execute(
          workspaceId,
        );

      // Get all credential counts in a single query (prevents N+1 problem)
      const groupIds = allGroups.map((g) => g.id!);
      const credentialCountMap =
        await this.countCredentialsByGroupsQueryService.execute(groupIds);

      const rootGroups = allGroups.filter((group) => !group.credentialGroupId);

      const groupsWithChildren = await Promise.all(
        rootGroups.map((group) =>
          this.buildGroupTree(group, allGroups, credentialCountMap),
        ),
      );

      return groupsWithChildren;
    } catch (error) {
      throw error;
    }
  }

  private async buildGroupTree(
    group: CredentialGroupModel,
    allGroups: CredentialGroupModel[],
    credentialCountMap: Map<string, number>,
  ): Promise<GetCredentialGroupQueryResponseDto> {
    const children = allGroups.filter((g) => g.credentialGroupId === group.id);

    const childrenWithSubChildren = await Promise.all(
      children.map((child) =>
        this.buildGroupTree(child, allGroups, credentialCountMap),
      ),
    );

    // O(1) lookup instead of database query
    const credentialCount = credentialCountMap.get(group.id!) ?? 0;

    const childrenCredentialCount = childrenWithSubChildren.reduce(
      (sum, child) => sum + child.totalCredentialCount,
      0,
    );
    const totalCredentialCount = credentialCount + childrenCredentialCount;

    const credentialGroupTypeName = !group.credentialGroupId
      ? group.credentialGroupTypeName
      : undefined;

    return new GetCredentialGroupQueryResponseDto(
      group,
      credentialCount,
      totalCredentialCount,
      childrenWithSubChildren.length > 0 ? childrenWithSubChildren : undefined,
      credentialGroupTypeName,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { GetCredentialGroupsByWorkspaceQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-workspace.query.service';
import { GetCredentialGroupsByParentQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-parent.query.service';
import { GetCredentialGroupQueryResponseDto } from 'src/application/dtos/credential-group/response/query/get-credential-group.query.response.dto';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { GetAllCredentialGroupTypesQueryService } from 'src/application/services/credential-group-type/query/get-all-credential-group-types.query.service';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';

@Injectable()
export class GetCredentialGroupsQueryUseCase {
  constructor(
    private readonly getCredentialGroupsByWorkspaceQueryService: GetCredentialGroupsByWorkspaceQueryService,
    private readonly getCredentialGroupsByParentQueryService: GetCredentialGroupsByParentQueryService,
    private readonly getAllCredentialGroupTypesQueryService: GetAllCredentialGroupTypesQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
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

      // Get all credential group types and create a map
      const allTypes =
        await this.getAllCredentialGroupTypesQueryService.execute();
      const typeMap = new Map(
        allTypes.map((type) => [type.id!, type.name ?? null]),
      );

      // Build tree structure (only root groups)
      const rootGroups = allGroups.filter((group) => !group.credentialGroupId);

      // Recursively build children for each root group
      const groupsWithChildren = await Promise.all(
        rootGroups.map((group) =>
          this.buildGroupTree(group, allGroups, typeMap),
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
    typeMap: Map<string, string | null>,
  ): Promise<GetCredentialGroupQueryResponseDto> {
    // Find direct children
    const children = allGroups.filter((g) => g.credentialGroupId === group.id);

    // Recursively build children trees
    const childrenWithSubChildren = await Promise.all(
      children.map((child) => this.buildGroupTree(child, allGroups, typeMap)),
    );

    // Get credentials for this group
    const credentials = await this.getCredentialsByGroupQueryService.execute(
      group.id!,
    );
    const credentialCount = credentials.length;

    // Calculate total credential count (this group + all descendants)
    const childrenCredentialCount = childrenWithSubChildren.reduce(
      (sum, child) => sum + child.totalCredentialCount,
      0,
    );
    const totalCredentialCount = credentialCount + childrenCredentialCount;

    // Get credential group type name (only for root groups)
    const credentialGroupTypeName =
      !group.credentialGroupId && group.credentialGroupTypeId
        ? (typeMap.get(group.credentialGroupTypeId) ?? null)
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

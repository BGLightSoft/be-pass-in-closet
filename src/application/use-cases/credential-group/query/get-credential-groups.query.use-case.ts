import { Injectable } from '@nestjs/common';
import { GetCredentialGroupsByWorkspaceQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-workspace.query.service';
import { GetCredentialGroupsByParentQueryService } from 'src/application/services/credential-group/query/get-credential-groups-by-parent.query.service';
import { GetCredentialGroupQueryResponseDto } from 'src/application/dtos/credential-group/response/query/get-credential-group.query.response.dto';
import { CredentialGroupModel } from 'src/domain/models/credential/credential-group.model';
import { GetCredentialsByGroupQueryService } from 'src/application/services/credential/query/get-credentials-by-group.query.service';

@Injectable()
export class GetCredentialGroupsQueryUseCase {
  constructor(
    private readonly getCredentialGroupsByWorkspaceQueryService: GetCredentialGroupsByWorkspaceQueryService,
    private readonly getCredentialGroupsByParentQueryService: GetCredentialGroupsByParentQueryService,
    private readonly getCredentialsByGroupQueryService: GetCredentialsByGroupQueryService,
  ) {}

  public async execute(
    workspaceId: string,
  ): Promise<GetCredentialGroupQueryResponseDto[]> {
    try {
      const allGroups =
        await this.getCredentialGroupsByWorkspaceQueryService.execute(
          workspaceId,
        );

      const rootGroups = allGroups.filter((group) => !group.credentialGroupId);

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
    const children = allGroups.filter((g) => g.credentialGroupId === group.id);

    const childrenWithSubChildren = await Promise.all(
      children.map((child) => this.buildGroupTree(child, allGroups)),
    );

    const credentials = await this.getCredentialsByGroupQueryService.execute(
      group.id!,
    );
    const credentialCount = credentials.length;

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

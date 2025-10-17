import { Injectable } from '@nestjs/common';
import { GetUserWorkspacesQueryService } from 'src/application/services/workspace/query/get-user-workspaces.query.service';
import { GetWorkspaceByIdQueryService } from 'src/application/services/workspace/query/get-workspace-by-id.query.service';
import { GetWorkspaceQueryResponseDto } from 'src/application/dtos/workspace/response/query/get-workspace.query.response.dto';

@Injectable()
export class GetUserWorkspacesQueryUseCase {
  constructor(
    private readonly getUserWorkspacesQueryService: GetUserWorkspacesQueryService,
    private readonly getWorkspaceByIdQueryService: GetWorkspaceByIdQueryService,
  ) {}

  public async execute(
    accountId: string,
  ): Promise<GetWorkspaceQueryResponseDto[]> {
    try {
      const accountHasWorkspaces =
        await this.getUserWorkspacesQueryService.execute(accountId);

      const workspaces = await Promise.all(
        accountHasWorkspaces.map(async (ahw) => {
          const workspace = await this.getWorkspaceByIdQueryService.execute(
            ahw.workspaceId!,
          );
          if (workspace) {
            return new GetWorkspaceQueryResponseDto(workspace, ahw.isDefault);
          }
          return null;
        }),
      );

      // Filter out null values
      return workspaces.filter(
        (w) => w !== null,
      ) as GetWorkspaceQueryResponseDto[];
    } catch (error) {
      throw error;
    }
  }
}

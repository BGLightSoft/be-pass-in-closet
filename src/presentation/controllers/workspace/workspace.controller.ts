import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/create-workspace.command.request.dto';
import { CreateWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/create-workspace.command.response.dto';
import { UpdateWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/update-workspace.command.request.dto';
import { UpdateWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/update-workspace.command.response.dto';
import { DeleteWorkspaceCommandResponseDto } from 'src/application/dtos/workspace/response/command/delete-workspace.command.response.dto';
import { GetWorkspaceQueryResponseDto } from 'src/application/dtos/workspace/response/query/get-workspace.query.response.dto';
import { CreateWorkspaceCommandUseCase } from 'src/application/use-cases/workspace/command/create-workspace.command.use-case';
import { UpdateWorkspaceCommandUseCase } from 'src/application/use-cases/workspace/command/update-workspace.command.use-case';
import { DeleteWorkspaceCommandUseCase } from 'src/application/use-cases/workspace/command/delete-workspace.command.use-case';
import { SetDefaultWorkspaceCommandUseCase } from 'src/application/use-cases/workspace/command/set-default-workspace.command.use-case';
import { SetDefaultWorkspaceCommandRequestDto } from 'src/application/dtos/workspace/request/command/set-default-workspace.command.request.dto';
import { GetUserWorkspacesQueryUseCase } from 'src/application/use-cases/workspace/query/get-user-workspaces.query.use-case';
import { AccountId } from 'src/presentation/decorators/account-id.decorator';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';

@ApiTags('Workspace')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(
    private readonly createWorkspaceCommandUseCase: CreateWorkspaceCommandUseCase,
    private readonly updateWorkspaceCommandUseCase: UpdateWorkspaceCommandUseCase,
    private readonly deleteWorkspaceCommandUseCase: DeleteWorkspaceCommandUseCase,
    private readonly setDefaultWorkspaceCommandUseCase: SetDefaultWorkspaceCommandUseCase,
    private readonly getUserWorkspacesQueryUseCase: GetUserWorkspacesQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiCreatedResponse({
    description: 'Workspace created successfully',
    type: CreateWorkspaceCommandResponseDto,
  })
  @Post()
  public async createWorkspace(
    @AccountId() accountId: string,
    @Body() body: CreateWorkspaceCommandRequestDto,
  ): Promise<CreateWorkspaceCommandResponseDto> {
    return this.createWorkspaceCommandUseCase.execute(accountId, body);
  }

  @ApiOperation({ summary: 'Get all user workspaces' })
  @ApiOkResponse({
    description: 'List of user workspaces retrieved successfully',
    type: [GetWorkspaceQueryResponseDto],
  })
  @Get()
  public async getUserWorkspaces(
    @AccountId() accountId: string,
  ): Promise<GetWorkspaceQueryResponseDto[]> {
    return this.getUserWorkspacesQueryUseCase.execute(accountId);
  }

  @ApiOperation({ summary: 'Update workspace' })
  @ApiOkResponse({
    description: 'Workspace updated successfully',
    type: UpdateWorkspaceCommandResponseDto,
  })
  @Patch(':workspaceId')
  public async updateWorkspace(
    @AccountId() accountId: string,
    @Param('workspaceId') workspaceId: string,
    @Body() body: UpdateWorkspaceCommandRequestDto,
  ): Promise<UpdateWorkspaceCommandResponseDto> {
    return this.updateWorkspaceCommandUseCase.execute(
      accountId,
      workspaceId,
      body,
    );
  }

  @ApiOperation({ summary: 'Delete workspace (soft delete)' })
  @ApiOkResponse({
    description: 'Workspace deleted successfully',
    type: DeleteWorkspaceCommandResponseDto,
  })
  @Delete(':workspaceId')
  public async deleteWorkspace(
    @AccountId() accountId: string,
    @Param('workspaceId') workspaceId: string,
  ): Promise<DeleteWorkspaceCommandResponseDto> {
    return this.deleteWorkspaceCommandUseCase.execute(accountId, workspaceId);
  }

  @ApiOperation({ summary: 'Set workspace as default' })
  @ApiOkResponse({
    description: 'Workspace set as default successfully',
  })
  @Patch(':workspaceId/set-default')
  public async setDefaultWorkspace(
    @AccountId() accountId: string,
    @Param('workspaceId') workspaceId: string,
  ): Promise<void> {
    const dto: SetDefaultWorkspaceCommandRequestDto = { workspaceId };
    return this.setDefaultWorkspaceCommandUseCase.execute(accountId, dto);
  }
}

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
  ApiHeader,
} from '@nestjs/swagger';
import { CreateCredentialGroupCommandRequestDto } from 'src/application/dtos/credential-group/request/command/create-credential-group.command.request.dto';
import { CreateCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/create-credential-group.command.response.dto';
import { UpdateCredentialGroupCommandRequestDto } from 'src/application/dtos/credential-group/request/command/update-credential-group.command.request.dto';
import { UpdateCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/update-credential-group.command.response.dto';
import { DeleteCredentialGroupCommandResponseDto } from 'src/application/dtos/credential-group/response/command/delete-credential-group.command.response.dto';
import { GetCredentialGroupQueryResponseDto } from 'src/application/dtos/credential-group/response/query/get-credential-group.query.response.dto';
import { CreateCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/create-credential-group.command.use-case';
import { UpdateCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/update-credential-group.command.use-case';
import { DeleteCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/delete-credential-group.command.use-case';
import { GetCredentialGroupsQueryUseCase } from 'src/application/use-cases/credential-group/query/get-credential-groups.query.use-case';
import { WorkspaceId } from 'src/presentation/decorators/workspace-id.decorator';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';

@ApiTags('Credential Group')
@ApiBearerAuth()
@ApiHeader({
  name: 'workspace-id',
  description: 'Workspace ID',
  required: true,
})
@UseGuards(AccessTokenGuard)
@Controller('credential-group')
export class CredentialGroupController {
  constructor(
    private readonly createCredentialGroupCommandUseCase: CreateCredentialGroupCommandUseCase,
    private readonly updateCredentialGroupCommandUseCase: UpdateCredentialGroupCommandUseCase,
    private readonly deleteCredentialGroupCommandUseCase: DeleteCredentialGroupCommandUseCase,
    private readonly getCredentialGroupsQueryUseCase: GetCredentialGroupsQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new credential group' })
  @ApiCreatedResponse({
    description: 'Credential group created successfully',
    type: CreateCredentialGroupCommandResponseDto,
  })
  @Post()
  public async createCredentialGroup(
    @WorkspaceId() workspaceId: string,
    @Body() body: CreateCredentialGroupCommandRequestDto,
  ): Promise<CreateCredentialGroupCommandResponseDto> {
    return this.createCredentialGroupCommandUseCase.execute(workspaceId, body);
  }

  @ApiOperation({
    summary: 'Get all credential groups for workspace (tree structure)',
  })
  @ApiOkResponse({
    description: 'List of credential groups retrieved successfully',
    type: [GetCredentialGroupQueryResponseDto],
  })
  @Get()
  public async getCredentialGroups(
    @WorkspaceId() workspaceId: string,
  ): Promise<GetCredentialGroupQueryResponseDto[]> {
    return this.getCredentialGroupsQueryUseCase.execute(workspaceId);
  }

  @ApiOperation({ summary: 'Update credential group' })
  @ApiOkResponse({
    description: 'Credential group updated successfully',
    type: UpdateCredentialGroupCommandResponseDto,
  })
  @Patch(':credentialGroupId')
  public async updateCredentialGroup(
    @WorkspaceId() workspaceId: string,
    @Param('credentialGroupId') credentialGroupId: string,
    @Body() body: UpdateCredentialGroupCommandRequestDto,
  ): Promise<UpdateCredentialGroupCommandResponseDto> {
    return this.updateCredentialGroupCommandUseCase.execute(
      workspaceId,
      credentialGroupId,
      body,
    );
  }

  @ApiOperation({ summary: 'Delete credential group (soft delete)' })
  @ApiOkResponse({
    description: 'Credential group deleted successfully',
    type: DeleteCredentialGroupCommandResponseDto,
  })
  @Delete(':credentialGroupId')
  public async deleteCredentialGroup(
    @WorkspaceId() workspaceId: string,
    @Param('credentialGroupId') credentialGroupId: string,
  ): Promise<DeleteCredentialGroupCommandResponseDto> {
    return this.deleteCredentialGroupCommandUseCase.execute(
      workspaceId,
      credentialGroupId,
    );
  }
}

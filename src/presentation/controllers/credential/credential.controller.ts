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
import { CreateCredentialCommandRequestDto } from 'src/application/dtos/credential/request/command/create-credential.command.request.dto';
import { CreateCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/create-credential.command.response.dto';
import { UpdateCredentialCommandRequestDto } from 'src/application/dtos/credential/request/command/update-credential.command.request.dto';
import { UpdateCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/update-credential.command.response.dto';
import { UpdateCredentialOrderRequestDto } from 'src/application/dtos/credential/request/command/update-credential-order.command.request.dto';
import { DeleteCredentialCommandResponseDto } from 'src/application/dtos/credential/response/command/delete-credential.command.response.dto';
import { GetCredentialQueryResponseDto } from 'src/application/dtos/credential/response/query/get-credential.query.response.dto';
import { CreateCredentialCommandUseCase } from 'src/application/use-cases/credential/command/create-credential.command.use-case';
import { UpdateCredentialCommandUseCase } from 'src/application/use-cases/credential/command/update-credential.command.use-case';
import { UpdateCredentialOrderCommandUseCase } from 'src/application/use-cases/credential/command/update-credential-order.command.use-case';
import { DeleteCredentialCommandUseCase } from 'src/application/use-cases/credential/command/delete-credential.command.use-case';
import { GetCredentialsByGroupQueryUseCase } from 'src/application/use-cases/credential/query/get-credentials-by-group.query.use-case';
import { GetCredentialParameterListByTypeQueryUseCase } from 'src/application/use-cases/credential/query/get-credential-parameter-list-by-type.query.use-case';
import { GetCredentialParameterListQueryResponseDto } from 'src/application/dtos/credential/response/query/get-credential-parameter-list.query.response.dto';
import { WorkspaceId } from 'src/presentation/decorators/workspace-id.decorator';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';

@ApiTags('Credential')
@ApiBearerAuth()
@ApiHeader({
  name: 'workspace-id',
  description: 'Workspace ID',
  required: true,
})
@UseGuards(AccessTokenGuard)
@Controller('credential')
export class CredentialController {
  constructor(
    private readonly createCredentialCommandUseCase: CreateCredentialCommandUseCase,
    private readonly updateCredentialCommandUseCase: UpdateCredentialCommandUseCase,
    private readonly updateCredentialOrderCommandUseCase: UpdateCredentialOrderCommandUseCase,
    private readonly deleteCredentialCommandUseCase: DeleteCredentialCommandUseCase,
    private readonly getCredentialsByGroupQueryUseCase: GetCredentialsByGroupQueryUseCase,
    private readonly getCredentialParameterListByTypeQueryUseCase: GetCredentialParameterListByTypeQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new credential' })
  @ApiCreatedResponse({
    description: 'Credential created successfully',
    type: CreateCredentialCommandResponseDto,
  })
  @Post()
  public async createCredential(
    @WorkspaceId() workspaceId: string,
    @Body() body: CreateCredentialCommandRequestDto,
  ): Promise<CreateCredentialCommandResponseDto> {
    return this.createCredentialCommandUseCase.execute(workspaceId, body);
  }

  @ApiOperation({
    summary: 'Get all credentials for a credential group',
  })
  @ApiOkResponse({
    description: 'List of credentials retrieved successfully',
    type: [GetCredentialQueryResponseDto],
  })
  @Get('group/:credentialGroupId')
  public async getCredentialsByGroup(
    @WorkspaceId() workspaceId: string,
    @Param('credentialGroupId') credentialGroupId: string,
  ): Promise<GetCredentialQueryResponseDto[]> {
    return this.getCredentialsByGroupQueryUseCase.execute(
      workspaceId,
      credentialGroupId,
    );
  }

  @ApiOperation({
    summary: 'Get parameter list (template) for a credential group type',
  })
  @ApiOkResponse({
    description: 'Parameter list retrieved successfully',
    type: [GetCredentialParameterListQueryResponseDto],
  })
  @Get('parameter-list/:credentialGroupTypeId')
  public async getParameterListByType(
    @Param('credentialGroupTypeId') credentialGroupTypeId: string,
  ): Promise<GetCredentialParameterListQueryResponseDto[]> {
    return this.getCredentialParameterListByTypeQueryUseCase.execute(
      credentialGroupTypeId,
    );
  }

  @ApiOperation({ summary: 'Update credential' })
  @ApiOkResponse({
    description: 'Credential updated successfully',
    type: UpdateCredentialCommandResponseDto,
  })
  @Patch(':credentialId')
  public async updateCredential(
    @WorkspaceId() workspaceId: string,
    @Param('credentialId') credentialId: string,
    @Body() body: UpdateCredentialCommandRequestDto,
  ): Promise<UpdateCredentialCommandResponseDto> {
    return this.updateCredentialCommandUseCase.execute(
      workspaceId,
      credentialId,
      body,
    );
  }

  @ApiOperation({ summary: 'Update credential order' })
  @ApiOkResponse({
    description: 'Credential order updated successfully',
  })
  @Patch('group/:credentialGroupId/order')
  public async updateCredentialOrder(
    @WorkspaceId() workspaceId: string,
    @Param('credentialGroupId') credentialGroupId: string,
    @Body() body: UpdateCredentialOrderRequestDto,
  ): Promise<void> {
    return this.updateCredentialOrderCommandUseCase.execute(
      workspaceId,
      credentialGroupId,
      body,
    );
  }

  @ApiOperation({ summary: 'Delete credential (soft delete)' })
  @ApiOkResponse({
    description: 'Credential deleted successfully',
    type: DeleteCredentialCommandResponseDto,
  })
  @Delete(':credentialId')
  public async deleteCredential(
    @WorkspaceId() workspaceId: string,
    @Param('credentialId') credentialId: string,
  ): Promise<DeleteCredentialCommandResponseDto> {
    return this.deleteCredentialCommandUseCase.execute(
      workspaceId,
      credentialId,
    );
  }
}

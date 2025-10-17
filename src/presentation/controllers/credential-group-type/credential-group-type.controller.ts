import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCredentialGroupTypeQueryResponseDto } from 'src/application/dtos/credential-group-type/response/query/get-credential-group-type.query.response.dto';
import { GetAllCredentialGroupTypesQueryUseCase } from 'src/application/use-cases/credential-group-type/query/get-all-credential-group-types.query.use-case';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';

@ApiTags('Credential Group Type')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('credential-group-type')
export class CredentialGroupTypeController {
  constructor(
    private readonly getAllCredentialGroupTypesQueryUseCase: GetAllCredentialGroupTypesQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all credential group types' })
  @ApiOkResponse({
    description: 'List of credential group types retrieved successfully',
    type: [GetCredentialGroupTypeQueryResponseDto],
  })
  @Get()
  public async getAllCredentialGroupTypes(): Promise<
    GetCredentialGroupTypeQueryResponseDto[]
  > {
    return this.getAllCredentialGroupTypesQueryUseCase.execute();
  }
}

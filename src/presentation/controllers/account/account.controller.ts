import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAccountRegistrationStatusCommandRequestDto } from 'src/application/dtos/account/response/command/update-account-registration-status.command.request.dto';
import { UpdateAccountRegistrationStatusCommandResponseDto } from 'src/application/dtos/account/response/command/update-account-registration-status.command.response.dto';
import { UpdateAccountCommandRequestDto } from 'src/application/dtos/account/request/command/update-account.command.request.dto';
import { UpdateAccountCommandResponseDto } from 'src/application/dtos/account/response/command/update-account.command.response.dto';
import { UpdateAccountPasswordCommandRequestDto } from 'src/application/dtos/account/request/command/update-account-password.command.request.dto';
import { UpdateAccountPasswordCommandResponseDto } from 'src/application/dtos/account/response/command/update-account-password.command.response.dto';
import { DeleteAccountCommandResponseDto } from 'src/application/dtos/account/response/command/delete-account.command.response.dto';
import { GetAccountQueryResponseDto } from 'src/application/dtos/account/response/query/get-account.query.response.dto';
import { GetAllAccountsQueryResponseDto } from 'src/application/dtos/account/response/query/get-all-accounts.query.response.dto';
import { DeleteAccountCommandUseCase } from 'src/application/use-cases/account/command/delete-account.command.use-case';
import { UpdateAccountPasswordCommandUseCase } from 'src/application/use-cases/account/command/update-account-password.command.use-case';
import { UpdateAccountRegistrationStatusCommandUseCase } from 'src/application/use-cases/account/command/update-account-registration-status.command.use-case';
import { UpdateAccountCommandUseCase } from 'src/application/use-cases/account/command/update-account.command.use-case';
import { GetAllAccountQueryUseCase } from 'src/application/use-cases/account/query/get-all-account.query.use-case';
import { GetOneAccountByIdQueryUseCase } from 'src/application/use-cases/account/query/get-one-account-by-id.query.use-case';
import { AccountId } from 'src/presentation/decorators/account-id.decorator';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';
import { GetMyAccountByIdQueryUseCase } from 'src/application/use-cases/account/query/get-my-account-by-id.query.use-case';

@ApiTags('Account')
@ApiBearerAuth()
@Controller('account')
export class AccountController {
  constructor(
    private readonly getAllAccountQueryUseCase: GetAllAccountQueryUseCase,
    private readonly updateAccountRegistrationStatusCommandUseCase: UpdateAccountRegistrationStatusCommandUseCase,
    private readonly updateAccountCommandUseCase: UpdateAccountCommandUseCase,
    private readonly deleteAccountCommandUseCase: DeleteAccountCommandUseCase,
    private readonly getOneAccountByIdQueryUseCase: GetOneAccountByIdQueryUseCase,
    private readonly updateAccountPasswordCommandUseCase: UpdateAccountPasswordCommandUseCase,
    private readonly getMyAccountByIdQueryUseCase: GetMyAccountByIdQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Update account password' })
  @ApiOkResponse({
    description: 'Password updated successfully',
    type: UpdateAccountPasswordCommandResponseDto,
  })
  @Put('password')
  public async updateAccountPassword(
    @AccountId() accountId: string,
    @Body() body: UpdateAccountPasswordCommandRequestDto,
  ): Promise<UpdateAccountPasswordCommandResponseDto> {
    return this.updateAccountPasswordCommandUseCase.execute(accountId, body);
  }

  @ApiOperation({ summary: 'Update account registration status' })
  @ApiOkResponse({
    description: 'Account registration status updated successfully',
    type: UpdateAccountRegistrationStatusCommandResponseDto,
  })
  @Put(':accountId/registration-status')
  public async updateAccountRegistrationStatus(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountRegistrationStatusCommandRequestDto,
  ): Promise<UpdateAccountRegistrationStatusCommandResponseDto> {
    return this.updateAccountRegistrationStatusCommandUseCase.execute(
      accountId,
      body,
    );
  }

  @ApiOperation({ summary: 'Update account parameters' })
  @ApiOkResponse({
    description: 'Account updated successfully',
    type: UpdateAccountCommandResponseDto,
  })
  @Patch(':accountId')
  public async updateAccount(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountCommandRequestDto,
  ): Promise<UpdateAccountCommandResponseDto | null> {
    return this.updateAccountCommandUseCase.execute(accountId, body);
  }

  @ApiOperation({ summary: 'Get all accounts' })
  @ApiOkResponse({
    description: 'List of all accounts retrieved successfully',
    type: [GetAllAccountsQueryResponseDto],
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  public async getAllAccounts(): Promise<GetAllAccountsQueryResponseDto[]> {
    return this.getAllAccountQueryUseCase.execute();
  }

  @ApiOperation({ summary: 'Get my account information' })
  @ApiOkResponse({
    description: 'Current user account information retrieved successfully',
    type: GetAccountQueryResponseDto,
  })
  @UseGuards(AccessTokenGuard)
  @Get('my')
  public async getMyAccount(
    @AccountId() accountId: string,
  ): Promise<GetAccountQueryResponseDto> {
    return this.getMyAccountByIdQueryUseCase.execute(accountId);
  }

  @ApiOperation({ summary: 'Get account by ID' })
  @ApiOkResponse({
    description: 'Account information retrieved successfully',
    type: GetAccountQueryResponseDto,
  })
  @Get(':accountId')
  public async getOneAccount(
    @Param('accountId') accountId: string,
  ): Promise<GetAccountQueryResponseDto> {
    return this.getOneAccountByIdQueryUseCase.execute(accountId);
  }

  @ApiOperation({ summary: 'Delete account (soft delete)' })
  @ApiOkResponse({
    description: 'Account deleted successfully',
    type: DeleteAccountCommandResponseDto,
  })
  @Delete(':accountId')
  public async deleteAccount(
    @Param('accountId') accountId: string,
  ): Promise<DeleteAccountCommandResponseDto> {
    return this.deleteAccountCommandUseCase.execute(accountId);
  }
}

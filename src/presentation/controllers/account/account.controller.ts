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
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAccountRegistrationStatusDto } from 'src/application/dtos/account/request/command/update-account-registration-status.dto';
import { UpdateAccountDto } from 'src/application/dtos/account/request/command/update-account.dto';
import { UpdateAccountPasswordDto } from 'src/application/dtos/account/request/command/update-account-password.dto';
import { DeleteAccountCommandUseCase } from 'src/application/use-cases/account/command/delete-account.command.use-case';
import { UpdateAccountPasswordCommandUseCase } from 'src/application/use-cases/account/command/update-account-password.command.use-case';
import { UpdateAccountRegistrationStatusCommandUseCase } from 'src/application/use-cases/account/command/update-account-registration-status.command.use-case';
import { UpdateAccountCommandUseCase } from 'src/application/use-cases/account/command/update-account.command.use-case';
import { GetAllAccountQueryUseCase } from 'src/application/use-cases/account/query/get-all-account.query.use-case';
import { GetOneAccountByIdQueryUseCase } from 'src/application/use-cases/account/query/get-one-account-by-id.query.use-case';
import { AccountModel } from 'src/domain/models/account/account.model';
import { AccountId } from 'src/presentation/decorators/account-id.decorator';
import { AccessTokenGuard } from 'src/presentation/quards/auth/access-token.guard';
import { GetMyAccountByIdQueryUseCase } from 'src/application/use-cases/account/query/get-my-account-by-id.query.use-case';

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
  ) { }



  @Put('password')
  public async updateAccountPassword(
    @AccountId() accountId: string,
    @Body() body: UpdateAccountPasswordDto,
  ): Promise<boolean> {
    return this.updateAccountPasswordCommandUseCase.execute(accountId, body);
  }

  @Put(':accountId/registration-status')
  public async updateAccountRegistrationStatus(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountRegistrationStatusDto,
  ): Promise<AccountModel> {
    return this.updateAccountRegistrationStatusCommandUseCase.execute(
      accountId,
      body,
    );
  }

  @Patch(':accountId')
  public async updateAccount(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountDto,
  ): Promise<AccountModel | null> {
    return this.updateAccountCommandUseCase.execute(accountId, body);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  public async getAllAccounts(): Promise<AccountModel[]> {
    return this.getAllAccountQueryUseCase.execute();
  }

  @UseGuards(AccessTokenGuard)
  @Get('my')
  public async getMyAccount(
    @AccountId() accountId: string,
  ): Promise<AccountModel[]> {
    return this.getMyAccountByIdQueryUseCase.execute(accountId);
  }

  @Get(':accountId')
  public async getOneAccount(
    @Param('accountId') accountId: string,
  ): Promise<any> {
    return this.getOneAccountByIdQueryUseCase.execute(accountId);
  }

  @Delete(':accountId')
  public async deleteAccount(
    @Param('accountId') accountId: string,
  ): Promise<any> {
    return this.deleteAccountCommandUseCase.execute(accountId);
  }
}

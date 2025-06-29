import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { UpdateAccountCommandService } from 'src/application/services/account/command/update-account.command.service';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { DataSource } from 'typeorm';
import { UpdateAccountDto } from 'src/application/dtos/account/request/command/update-account.dto';
import { UpdateAccountParameterCommandService } from 'src/application/services/account/command/update-account-parameter.command.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class UpdateAccountCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateAccountCommandService: UpdateAccountCommandService,
    private readonly updateAccountParameterCommandService: UpdateAccountParameterCommandService,
    private readonly getOneAccountByIdQueryService: GetOneAccountByIdQueryService,
  ) {}
  public async execute(
    accountId: string,
    body: UpdateAccountDto,
  ): Promise<AccountModel | null> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountModel: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      if (!accountModel) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );
      }

      const { account, accountParameters } = body;

      if (account && Object.keys(account).length > 0) {
        await this.updateAccountCommandService.execute(
          queryRunner,
          accountId,
          account,
        );
      }

      if (accountParameters) {
        await this.updateAccountParameterCommandService.execute(
          queryRunner,
          accountId,
          accountParameters,
        );
      }

      await queryRunner.commitTransaction();

      const updatedAccountModel: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      return updatedAccountModel;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

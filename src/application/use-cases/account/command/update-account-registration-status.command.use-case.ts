import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { UpdateAccountCommandService } from 'src/application/services/account/command/update-account.command.service';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { DataSource } from 'typeorm';
import { UpdateAccountRegistrationStatusDto } from 'src/application/dtos/account/request/command/update-account-registration-status.dto';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class UpdateAccountRegistrationStatusCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly updateAccountCommandService: UpdateAccountCommandService,
    private readonly getOneAccountByIdQueryService: GetOneAccountByIdQueryService,
  ) {}
  public async execute(
    accountId: string,
    body: UpdateAccountRegistrationStatusDto,
  ): Promise<AccountModel> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      if (!account) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );
      }

      const { registrationStatus } = body;

      if (account.registrationStatus == registrationStatus) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.SAME_REGISTRATION,
        );
      }

      await this.updateAccountCommandService.execute(queryRunner, accountId, {
        registrationStatus,
      });

      await queryRunner.commitTransaction();

      return account;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

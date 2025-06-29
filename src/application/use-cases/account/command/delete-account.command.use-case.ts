import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountModel } from 'src/domain/models/account/account.model';
import { DeleteAccountCommandService } from 'src/application/services/account/command/delete-account.command.service';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';

@Injectable()
export class DeleteAccountCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getOneAccountByIdQueryService: GetOneAccountByIdQueryService,
    private readonly deleteAccountCommandService: DeleteAccountCommandService,
  ) {}
  public async execute(accountId: string): Promise<any> {
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

      await this.deleteAccountCommandService.execute(queryRunner, accountId);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

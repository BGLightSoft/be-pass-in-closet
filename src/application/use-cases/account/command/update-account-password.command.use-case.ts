import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { DataSource } from 'typeorm';
import { UpdateAccountPasswordDto } from 'src/application/dtos/account/request/command/update-account-password.dto';
import { UpdateAccountPasswordCommandService } from 'src/application/services/account/command/update-account-password.command.service';
import { HashService } from 'src/application/services/hash/hash.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';

@Injectable()
export class UpdateAccountPasswordCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getOneAccountByIdQueryService: GetOneAccountByIdQueryService,
    private readonly updateAccountPasswordCommandService: UpdateAccountPasswordCommandService,
    private readonly hashService: HashService,
  ) {}
  public async execute(
    accountId: string,
    body: UpdateAccountPasswordDto,
  ): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const accountModel: AccountModel | null =
        await this.getOneAccountByIdQueryService.execute(accountId);

      if (!accountModel)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );

      const { oldPassword, newPassword, newPasswordAgain } = body;

      const isPasswordMatch = await this.hashService.comparePassword(
        oldPassword,
        accountModel.password!,
      );

      if (!isPasswordMatch)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.OLD_PASS_WRONG,
        );

      if (newPassword !== newPasswordAgain)
        throw new BusinessErrorException(AccountErrorMessagesEnum.NEW_PASS);

      if (oldPassword === newPassword)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.SAME_NEW_PASS,
        );

      await this.updateAccountPasswordCommandService.execute(
        queryRunner,
        accountId,
        newPassword,
      );

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

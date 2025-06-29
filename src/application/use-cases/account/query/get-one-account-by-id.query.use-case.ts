import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { GetOneAccountByIdQueryService } from 'src/application/services/account/query/get-one-account-by-id.query.service';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';

@Injectable()
export class GetOneAccountByIdQueryUseCase {
  constructor(
    private readonly GetOneAccountByIdQueryService: GetOneAccountByIdQueryService,
  ) {}
  public async execute(accountId: string): Promise<AccountModel | null> {
    try {
      const accountModel: AccountModel | null =
        await this.GetOneAccountByIdQueryService.execute(accountId);

      if (!accountModel)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );

      return accountModel;
    } catch (error) {
      throw error;
    }
  }
}

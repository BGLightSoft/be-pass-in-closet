import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { AccountModel } from 'src/domain/models/account/account.model';

@Injectable()
export class UpdateAccountCommandService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    accountParam: Partial<AccountModel>,
  ): Promise<any> {
    const updatePayload: Partial<AccountModel> = {
      ...accountParam,
    };

    return await this.accountRepository.update(
      { id: accountId },
      updatePayload as any,
      queryRunner,
    );
  }
}

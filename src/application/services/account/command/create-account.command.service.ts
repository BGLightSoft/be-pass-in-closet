import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AccountModel } from 'src/domain/models/account/account.model';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { HashService } from 'src/application/services/hash/hash.service';

@Injectable()
export class CreateAccountCommandService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
    private readonly hashService: HashService,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountParam: Partial<AccountModel>,
  ): Promise<AccountModel> {
    const hashedPassword = await this.hashService.hashPassword(
      accountParam.password!,
    );

    const accountModel = new AccountModel({
      ...accountParam,
      password: hashedPassword,
    });

    const createdAccount = await this.accountRepository.save(
      accountModel,
      {},
      queryRunner,
    );

    return createdAccount;
  }
}

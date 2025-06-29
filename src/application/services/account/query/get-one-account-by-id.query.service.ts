import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';

@Injectable()
export class GetOneAccountByIdQueryService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) { }

  public async execute(accountId: string): Promise<AccountModel | null> {

    return this.accountRepository.findOne({
      where: { id: accountId },
      relations: ['accountParameters'],
    });
  }
}

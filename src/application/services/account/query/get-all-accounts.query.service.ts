import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account/account.model';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';

@Injectable()
export class GetAllAccountsQueryService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(): Promise<AccountModel[]> {
    return this.accountRepository.find({
      relations: [
        'accountParameters',
        'accountHasRoles',
        'accountHasRoles.role',
        'accountHasRoles.role.rolePermissions',
      ],
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { AccountModel } from 'src/domain/models/account/account.model';
import { HashService } from '../../hash/hash.service';

@Injectable()
export class UpdateAccountPasswordCommandService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
    private readonly hashService: HashService,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    password: string,
  ): Promise<any> {
    const hashedPassword = await this.hashService.hashPassword(password);
    const updatePayload: Partial<AccountModel> = {
      password: hashedPassword,
    };

    return await this.accountRepository.update(
      { id: accountId },
      updatePayload as any,
      queryRunner,
    );
  }
}

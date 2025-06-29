import { Inject, Injectable } from '@nestjs/common';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';

@Injectable()
export class GetAccountTokenQueryService {
  constructor(
    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,
  ) {}

  public async byAccountId(
    accountId: string,
    tokenType: string,
  ): Promise<AccountTokenModel | null> {
    return this.accountTokenRepository.findOne({
      where: { accountId, type: tokenType },
    });
  }

  public async byToken(
    accountId: string,
    tokenType: string,
    token: string,
  ): Promise<AccountTokenModel | null> {
    return this.accountTokenRepository.findOne({
      where: { accountId, token, type: tokenType },
    });
  }

  public async byTokenableId(
    tokenableId: string,
  ): Promise<AccountTokenModel | null> {
    return this.accountTokenRepository.findOne({
      where: { id: tokenableId },
    });
  }
}

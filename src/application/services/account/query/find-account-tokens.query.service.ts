import { Inject, Injectable } from '@nestjs/common';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';

@Injectable()
export class FindAccountTokenQueryService {
  constructor(
    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,
  ) {}

  public async execute(
    accountId: string,
    tokenType: AccountTokenTypeEnum,
    token: string,
  ): Promise<AccountTokenModel | null> {
    return this.accountTokenRepository.findOne({
      where: { accountId, type: tokenType, token },
    });
  }
}

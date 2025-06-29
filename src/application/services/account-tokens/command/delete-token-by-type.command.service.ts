import { Inject, Injectable } from '@nestjs/common';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';

@Injectable()
export class DeleteTokenByTypeCommandService {
  constructor(
    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,
  ) {}

  public async execute(
    accountId: string,
    type: AccountTokenTypeEnum,
  ): Promise<any> {
    await this.accountTokenRepository.delete({ accountId, type });
    return true;
  }
}

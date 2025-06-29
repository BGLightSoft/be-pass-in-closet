import { Inject, Injectable } from '@nestjs/common';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';

@Injectable()
export class DeleteTokenCommandService {
  constructor(
    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,
  ) {}

  public async execute(accountId: string, token: string): Promise<any> {
    await this.accountTokenRepository.delete({ accountId, token });
    return true;
  }
}

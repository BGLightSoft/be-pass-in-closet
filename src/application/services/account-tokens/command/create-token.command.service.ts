import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { AccountTokenModel } from 'src/domain/models/account/account-token.model';

@Injectable()
export class CreateTokenCommandService {
  constructor(
    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    tokenType: AccountTokenTypeEnum,
    token: string,
    tokenableId?: string,
  ): Promise<any> {
    const accountTokenModel: AccountTokenModel = new AccountTokenModel({
      accountId,
      type: tokenType,
      tokenableId,
      token,
    });

    return this.accountTokenRepository.save(accountTokenModel, {}, queryRunner);
  }
}

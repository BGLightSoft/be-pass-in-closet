import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { IAccountRepository } from 'src/domain/repositories/account/account.repository.interface';
import { IAccountPhoneRepository } from 'src/domain/repositories/account/account-phone.repository.interface';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';
import { IAccountTokenRepository } from 'src/domain/repositories/account/account-token-repository.interface';
import { IAccountParameterRepository } from 'src/domain/repositories/account/account-parameter.repository.interface';

@Injectable()
export class DeleteAccountCommandService {
  constructor(
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,

    @Inject(IAccountPhoneRepository)
    private readonly accountPhoneRepository: IAccountPhoneRepository,

    @Inject(IOtpCodeRepository)
    private readonly otpCodeRepository: IOtpCodeRepository,

    @Inject(IAccountTokenRepository)
    private readonly accountTokenRepository: IAccountTokenRepository,

    @Inject(IAccountParameterRepository)
    private readonly accountParameterRepository: IAccountParameterRepository,

  ) { }

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
  ): Promise<any> {
    await this.accountRepository.softDelete({ id: accountId }, queryRunner);

    await this.accountPhoneRepository.softDelete({ accountId }, queryRunner);

    await this.otpCodeRepository.delete({ accountId });

    await this.accountTokenRepository.delete({ accountId });

    await this.accountParameterRepository.softDelete(
      { accountId },
      queryRunner,
    );

    return true;
  }
}

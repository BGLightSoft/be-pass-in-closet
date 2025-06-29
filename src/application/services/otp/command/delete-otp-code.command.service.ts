import { Inject, Injectable } from '@nestjs/common';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';

@Injectable()
export class DeleteOtpCodeCommandService {
  constructor(
    @Inject(IOtpCodeRepository)
    private readonly otpCodeRepository: IOtpCodeRepository,
  ) {}

  public async execute(
    accountId: string,
    code: string,
    type: OtpCodeTypeEnum,
  ): Promise<any> {
    return this.otpCodeRepository.delete({ type, accountId, code });
  }
}

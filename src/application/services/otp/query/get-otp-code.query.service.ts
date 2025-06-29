import { Inject, Injectable } from '@nestjs/common';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';

@Injectable()
export class GetOtpCodeQueryService {
  constructor(
    @Inject(IOtpCodeRepository)
    private readonly otpCodeRepository: IOtpCodeRepository,
  ) {}

  public async execute(
    accountId: string,
    otpCodeType: OtpCodeTypeEnum,
    code: string,
  ): Promise<OtpCodeModel | null> {
    return this.otpCodeRepository.findOne({
      where: { accountId, type: otpCodeType, code },
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { OtpUtils } from 'src/application/utils/otp/otp.utils';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { IOtpCodeRepository } from 'src/domain/repositories/otp/otp-code.repository.interface';
import { OtpCodeExpireMinuteTimeEnum } from 'src/domain/enums/otp/otp-code-expire-minute-time.enum';

@Injectable()
export class CreateOtpCodeCommandService {
  constructor(
    @Inject(IOtpCodeRepository)
    private readonly otpCodeRepository: IOtpCodeRepository,
  ) {}

  public async execute(
    queryRunner: QueryRunner,
    accountId: string,
    otpCodeType: OtpCodeTypeEnum,
    expireMinutes: OtpCodeExpireMinuteTimeEnum,
  ): Promise<OtpCodeModel> {
    const otpCode: string = OtpUtils.createOtpCode();

    const now = new Date();
    const expireAt = new Date(now.getTime() + expireMinutes * 60 * 1000);

    const otpCodeModel = new OtpCodeModel({
      accountId,
      code: otpCode,
      type: otpCodeType,
      createdAt: now,
      expireAt,
      usedAt: null,
    });

    return this.otpCodeRepository.save(otpCodeModel, {}, queryRunner);
  }
}

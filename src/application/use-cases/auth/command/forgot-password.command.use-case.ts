import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GetAccountByEmailQueryService } from 'src/application/services/account/query/get-account-by-email.query.service';
import { AccountModel } from 'src/domain/models/account/account.model';
import { ForgotPasswordDto } from 'src/application/dtos/auth/forgot-password.dto';
import { CreateTokenCommandService } from 'src/application/services/account-tokens/command/create-token.command.service';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { CreateOtpCodeCommandService } from 'src/application/services/otp/command/create-otp-code.command.service';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { OtpCodeExpireMinuteTimeEnum } from 'src/domain/enums/otp/otp-code-expire-minute-time.enum';
import { MailSenderCommandService } from 'src/application/services/notification/command/mail-sender.command.service';
import { MailInfoType } from 'src/domain/mail/mail-info.type';

@Injectable()
export class ForgotPasswordCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly getAccountByEmailQueryService: GetAccountByEmailQueryService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly createTokenCommandService: CreateTokenCommandService,
    private readonly createOtpCodeCommandService: CreateOtpCodeCommandService,
    private readonly mailSenderCommandService: MailSenderCommandService,
  ) {}
  public async execute(body: ForgotPasswordDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email } = body;

      const accountModel: AccountModel | any =
        await this.getAccountByEmailQueryService.execute(email);

      if (!accountModel) return true;

      const forgotPasswordToken: string =
        this.jwtTokenService.generateForgotPasswordToken({
          accountId: accountModel.id,
        });

      await this.createTokenCommandService.execute(
        queryRunner,
        accountModel.id,
        AccountTokenTypeEnum.FORGOT_PASSWORD_TOKEN,
        forgotPasswordToken,
      );

      const forgotPasswordOtpCodeModel =
        await this.createOtpCodeCommandService.execute(
          queryRunner,
          accountModel.id,
          OtpCodeTypeEnum.FORGOT_PASSWORD,
          OtpCodeExpireMinuteTimeEnum.FORGOT_PASSWORD,
        );

      const mailInfo: MailInfoType = {
        to: email,
        template: 'otp',
        context: {
          name: email,
          email,
          otp: forgotPasswordOtpCodeModel.code,
          expireTime: OtpCodeExpireMinuteTimeEnum.FORGOT_PASSWORD,
          year: new Date().getFullYear(),
        },
        language: 'tr',
      };
      await this.mailSenderCommandService.mailSender(mailInfo);

      await queryRunner.commitTransaction();

      return { forgotPasswordToken };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

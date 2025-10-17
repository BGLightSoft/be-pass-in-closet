import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SignUpCommandRequestDto } from 'src/application/dtos/auth/request/command/sign-up.command.request.dto';
import { SignUpCommandResponseDto } from 'src/application/dtos/auth/response/command/sign-up.command.response.dto';
import { CreateAccountParameterCommandService } from 'src/application/services/account/command/create-account-parameter.command.service';
import { CreateAccountCommandService } from 'src/application/services/account/command/create-account.command.service';
import { AccountModel } from 'src/domain/models/account/account.model';
import { CreateOtpCodeCommandService } from 'src/application/services/otp/command/create-otp-code.command.service';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { OtpCodeExpireMinuteTimeEnum } from 'src/domain/enums/otp/otp-code-expire-minute-time.enum';
import { CreateTokenCommandService } from 'src/application/services/account-tokens/command/create-token.command.service';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { MailInfoType } from 'src/domain/mail/mail-info.type';
import { MailSenderCommandService } from 'src/application/services/notification/command/mail-sender.command.service';
import { GetAccountByEmailQueryService } from 'src/application/services/account/query/get-account-by-email.query.service';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';

@Injectable()
export class SignUpCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly createAccountCommandService: CreateAccountCommandService,
    private readonly createAccountParameterCommandService: CreateAccountParameterCommandService,
    private readonly createOtpCodeCommandService: CreateOtpCodeCommandService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly createTokenCommandService: CreateTokenCommandService,
    private readonly mailSenderCommandService: MailSenderCommandService,
    private readonly getAccountByEmailQueryService: GetAccountByEmailQueryService,
  ) {}
  public async execute(
    body: SignUpCommandRequestDto,
  ): Promise<SignUpCommandResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password, firstName, lastName } = body;
      const accountModel =
        await this.getAccountByEmailQueryService.execute(email);

      if (accountModel) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.EMAIL_ALREADY_EXIST,
        );
      }
      const createdAccountModel: AccountModel =
        await this.createAccountCommandService.execute(queryRunner, {
          email,
          password,
        });

      if (!createdAccountModel.id) {
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.ACCOUNT_NOT_FOUND,
        );
      }

      await this.createAccountParameterCommandService.execute(
        queryRunner,
        createdAccountModel.id,
        [{ firstName, lastName }],
      );

      const signupOtpCodeModel: OtpCodeModel =
        await this.createOtpCodeCommandService.execute(
          queryRunner,
          createdAccountModel.id,
          OtpCodeTypeEnum.SIGN_UP,
          OtpCodeExpireMinuteTimeEnum.SIGN_UP,
        );

      const signUpVerifiedToken: string =
        this.jwtTokenService.generateSignUpVerifiedToken({
          email,
          accountId: createdAccountModel.id,
        });

      await this.createTokenCommandService.execute(
        queryRunner,
        createdAccountModel.id,
        AccountTokenTypeEnum.SIGN_UP_VERFIED_TOKEN,
        signUpVerifiedToken,
      );

      const mailInfo: MailInfoType = {
        to: email,
        template: 'otp',
        context: {
          name: email,
          email,
          otp: signupOtpCodeModel.code,
          expireTime: OtpCodeExpireMinuteTimeEnum.SIGN_UP,
          year: new Date().getFullYear(),
        },
        language: 'tr',
      };
      await this.mailSenderCommandService.mailSender(mailInfo);
      await queryRunner.commitTransaction();

      return new SignUpCommandResponseDto(signUpVerifiedToken);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

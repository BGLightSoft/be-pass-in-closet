import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';
import { UpdateForgotPasswordDto } from 'src/application/dtos/auth/update-forgot-password.dto';
import { IForgotPasswordtoken } from 'src/domain/tokens/forgot-password-token-payload.interface';
import { UpdateAccountPasswordCommandService } from 'src/application/services/account/command/update-account-password.command.service';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { GetOtpCodeQueryService } from 'src/application/services/otp/query/get-otp-code.query.service';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { DeleteOtpCodeCommandService } from 'src/application/services/otp/command/delete-otp-code.command.service';
import { DeleteTokenByTypeCommandService } from 'src/application/services/account-tokens/command/delete-token-by-type.command.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class UpdateForgotPasswordCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtTokenService: JwtTokenService,
    private readonly updateAccountPasswordCommandService: UpdateAccountPasswordCommandService,
    private readonly getOtpCodeQueryService: GetOtpCodeQueryService,
    private readonly deleteOtpCodeCommandService: DeleteOtpCodeCommandService,
    private readonly deleteTokenByTypeCommandService: DeleteTokenByTypeCommandService,
  ) {}
  public async execute(body: UpdateForgotPasswordDto, token: string | null) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!token)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );

      const forgotPasswordTokenPayload: IForgotPasswordtoken =
        this.jwtTokenService.decodeToken<IForgotPasswordtoken>(token);

      const { accountId } = forgotPasswordTokenPayload;

      const { password, passwordAgain, forgotPasswordCode } = body;

      if (password !== passwordAgain)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.PASS_NOT_MATCH,
        );

      const otpCodeModel: OtpCodeModel | null =
        await this.getOtpCodeQueryService.execute(
          accountId,
          OtpCodeTypeEnum.FORGOT_PASSWORD,
          forgotPasswordCode,
        );

      if (!otpCodeModel)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.CODE_NOT_FOUND,
        );

      await this.updateAccountPasswordCommandService.execute(
        queryRunner,
        accountId,
        password,
      );

      await queryRunner.commitTransaction();

      await this.deleteOtpCodeCommandService.execute(
        accountId,
        forgotPasswordCode,
        OtpCodeTypeEnum.FORGOT_PASSWORD,
      );

      await this.deleteTokenByTypeCommandService.execute(
        accountId,
        AccountTokenTypeEnum.FORGOT_PASSWORD_TOKEN,
      );

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JwtTokenService } from 'src/application/services/jwt/jwt-token.service';
import { ISignUpVerifiedToken } from 'src/domain/tokens/sign-up-verified-token.interface';
import { UpdateAccountCommandService } from 'src/application/services/account/command/update-account.command.service';
import { SignUpVerifieDto } from 'src/application/dtos/auth/sign-up-verified.dto';
import { GetOtpCodeQueryService } from 'src/application/services/otp/query/get-otp-code.query.service';
import { OtpCodeModel } from 'src/domain/models/otp/otp-code.model';
import { OtpCodeTypeEnum } from 'src/domain/enums/otp/otp-code-type.enum';
import { AccountErrorMessagesEnum } from 'src/domain/enums/error-messages/account-error-messages.enum';
import { BusinessErrorException } from 'src/presentation/exceptions/business-error.exception';
import { DeleteTokenByTypeCommandService } from 'src/application/services/account-tokens/command/delete-token-by-type.command.service';
import { DeleteOtpCodeCommandService } from 'src/application/services/otp/command/delete-otp-code.command.service';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class SignUpVerifiedCommandUseCase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtTokenService: JwtTokenService,
    private readonly updateAccountCommandService: UpdateAccountCommandService,
    private readonly getOtpCodeQueryService: GetOtpCodeQueryService,
    private readonly deleteOtpCodeCommandService: DeleteOtpCodeCommandService,
    private readonly deleteTokenByTypeCommandService: DeleteTokenByTypeCommandService,
  ) {}
  public async execute(body: SignUpVerifieDto, token: string | null) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!token)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.TOKEN_NOT_FOUND,
        );

      const signUpVerifiedTokenPayload: ISignUpVerifiedToken =
        this.jwtTokenService.decodeToken<ISignUpVerifiedToken>(token);

      const { accountId } = signUpVerifiedTokenPayload;

      const { signUpVerifiedCode } = body;

      const otpCodeModel: OtpCodeModel | null =
        await this.getOtpCodeQueryService.execute(
          accountId,
          OtpCodeTypeEnum.SIGN_UP,
          signUpVerifiedCode,
        );

      if (!otpCodeModel)
        throw new BusinessErrorException(
          AccountErrorMessagesEnum.CODE_NOT_FOUND,
        );

      await this.updateAccountCommandService.execute(queryRunner, accountId, {
        verifiedAt: new Date(),
      });

      await queryRunner.commitTransaction();

      await this.deleteOtpCodeCommandService.execute(
        accountId,
        otpCodeModel.code!,
        OtpCodeTypeEnum.SIGN_UP,
      );

      await this.deleteTokenByTypeCommandService.execute(
        accountId,
        AccountTokenTypeEnum.SIGN_UP_VERFIED_TOKEN,
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

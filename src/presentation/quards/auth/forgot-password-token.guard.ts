import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class ForgotPasswordTokenGuard extends AuthGuard(
  AccountTokenTypeEnum.FORGOT_PASSWORD_TOKEN,
) {}

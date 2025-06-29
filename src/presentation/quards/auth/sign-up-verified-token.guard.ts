import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class SignUpVerifiedTokenGuard extends AuthGuard(
  AccountTokenTypeEnum.SIGN_UP_VERFIED_TOKEN,
) {}

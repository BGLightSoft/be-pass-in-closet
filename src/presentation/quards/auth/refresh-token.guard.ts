import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  AccountTokenTypeEnum.REFRESH_TOKEN,
) {}

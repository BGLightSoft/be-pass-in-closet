import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AccountTokenTypeEnum } from 'src/domain/enums/account/account-token-type.enum';
import { SKIP_AUTH_KEY } from 'src/presentation/decorators/skip-auth.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard(
  AccountTokenTypeEnum.ACCESS_TOKEN,
) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isSkipped = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isSkipped) {
      return true;
    }

    return super.canActivate(context);
  }
}

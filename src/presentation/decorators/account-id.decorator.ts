import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const AccountId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as { accountId?: string };

    if (!user?.accountId) {
      throw new UnauthorizedException('accountId not found in token payload');
    }

    return user.accountId;
  },
);

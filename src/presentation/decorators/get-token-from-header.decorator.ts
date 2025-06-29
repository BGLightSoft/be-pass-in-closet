import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTokenFromHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return authHeader.replace('Bearer ', '');
    }

    return null;
  },
);

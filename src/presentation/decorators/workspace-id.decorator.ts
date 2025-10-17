import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

export const WorkspaceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const workspaceId = request.headers['workspace-id'] as string;

    if (!workspaceId) {
      throw new BadRequestException('workspace-id header is required');
    }

    return workspaceId;
  },
);

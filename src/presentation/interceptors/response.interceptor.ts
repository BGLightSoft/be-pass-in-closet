import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBodyFactory } from '../factories/response-body.factory';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const path = context.switchToHttp().getRequest().route.path;
    return next
      .handle()
      .pipe(
        map((data) =>
          ResponseBodyFactory.createSuccessfulResponseBody(path, data),
        ),
      );
  }
}

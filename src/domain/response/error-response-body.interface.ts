import { IBaseResponseBody } from './base-response-body.interface';

export interface IErrorResponseBody extends IBaseResponseBody {
  message: string | string[];
}

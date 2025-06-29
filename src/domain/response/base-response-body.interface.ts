import { ResponseTypeEnum } from './response-type.enum';

export interface IBaseResponseBody {
  responseType: ResponseTypeEnum;
  path: string;
  timestamp: string;
}

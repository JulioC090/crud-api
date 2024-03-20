import { IHttpResponse } from '@/protocols/IHttp';
import IHttpError from '@/protocols/IHttpError';

function errorHandle(error: IHttpError): IHttpResponse {
  if (error.statusCode === undefined) return { status: 500 };
  return { status: error.statusCode, data: error.message };
}

export default errorHandle;

import { IHttpResponse } from '@/protocols/IHttp';
import IHttpError from '@/protocols/IHttpError';
import { ZodError } from 'zod';

function errorHandle(error: IHttpError): IHttpResponse {
  if (error instanceof ZodError)
    return { status: 400, data: JSON.parse(error.message!) };

  if (error.statusCode === undefined) return { status: 500 };
  return { status: error.statusCode, data: error.message };
}

export default errorHandle;

import IHttpError from '@/protocols/IHttpError';

class DBConnectionError extends Error implements IHttpError {
  message: string = 'Error connecting to the database';
  name: string = 'DBConnection Error';
  statusCode: number = 500;

  constructor(message?: string, name?: string) {
    super();
    if (message) this.message = message;
    if (name) this.name = name;
  }
}

export default DBConnectionError;

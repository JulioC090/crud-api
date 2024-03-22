import IHttpError from '@/protocols/IHttpError';
import { faker } from '@faker-js/faker';

export const mockHttpError = (): IHttpError => {
  return {
    statusCode: faker.internet.httpStatusCode({
      types: ['clientError', 'serverError'],
    }),
    message: faker.lorem.words({ min: 1, max: 3 }),
  };
};

export const mockHttpErrorWithoutStatusCode = (): IHttpError => {
  return {
    message: faker.lorem.words({ min: 1, max: 3 }),
  };
};

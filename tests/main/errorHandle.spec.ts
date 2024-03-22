import errorHandle from '@/main/errorHandle';
import {
  mockHttpError,
  mockHttpErrorWithoutStatusCode,
} from '@/tests/mocks/data/mockHttpError';

const sut = errorHandle;

describe('errorHandle', () => {
  test('Should return the status code of error', () => {
    const error = mockHttpError();

    const response = sut(error);

    expect(response.status).toBe(error.statusCode);
    expect(response.data).toBe(error.message);
  });

  test('Should return 500 code when statusCode is undefined', () => {
    const error = mockHttpErrorWithoutStatusCode();

    const response = sut(error);

    expect(response.status).toBe(500);
  });

  test('Should return only status when message is undefined', () => {
    const response = sut({});
    expect(response.status).toBe(500);
  });
});

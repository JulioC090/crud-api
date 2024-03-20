import errorHandle from '@/main/errorHandle';
import IHttpError from '@/protocols/IHttpError';

const sut = errorHandle;

describe('errorHandle', () => {
  test('Should return the status code of error', () => {
    const error: IHttpError = {
      statusCode: 400,
      message: 'test_error',
    };

    const response = sut(error);

    expect(response.status).toBe(error.statusCode);
    expect(response.data).toBe(error.message);
  });

  test('Should return 500 code when statusCode is undefined', () => {
    const error: IHttpError = {
      message: 'test_error',
    };

    const response = sut(error);

    expect(response.status).toBe(500);
  });

  test('Should return only status when message is undefined', () => {
    const response = sut({});
    expect(response.status).toBe(500);
  });
});

import UpdateProductController from '@/controllers/UpdateProductController';
import {
  mockProductId,
  mockProductWithoutId,
  mockProductWithoutIdAndEmptyDescription,
  mockProductWithoutIdAndEmptyName,
  mockProductWithoutIdAndInvalidPrice,
} from '@/tests/mocks/data/mockProduct';
import UpdateProductServiceSpy from '@/tests/mocks/services/UpdateProductServiceSpy';

const makeSut = () => {
  const updateProductService = new UpdateProductServiceSpy();
  const sut = new UpdateProductController(updateProductService);

  return { sut, updateProductService };
};

describe('UpdateProductController', () => {
  test('Should return 200 code on success', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutId(),
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(200);
  });

  test('Should throw when id is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ params: {}, body: mockProductWithoutId() });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when id is empty', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({
      params: { id: '' },
      body: mockProductWithoutId(),
    });

    await expect(promise).rejects.toThrow();
  });

  test('Should return 400 when request body is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: {},
    };

    const response = await sut.handle(request);

    expect(response).toEqual({ status: 400 });
  });

  test('Should throw when name is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutIdAndEmptyName(),
    };

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when description is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutIdAndEmptyDescription(),
    };

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when price is negative', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutIdAndInvalidPrice(),
    };

    const promise = sut.handle(request);

    await expect(promise).rejects.toThrow();
  });

  test('Should call UpdateProductService with correct values', async () => {
    const { sut, updateProductService } = makeSut();

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutId(),
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(200);
    expect(updateProductService.params).toEqual({
      id: request.params.id,
      partialProduct: request.body,
    });
  });

  test('Should return 500 when UpdateProductService returns false', async () => {
    const { sut, updateProductService } = makeSut();
    updateProductService.result = false;

    const request = {
      params: { id: mockProductId() },
      body: mockProductWithoutId(),
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(500);
  });
});

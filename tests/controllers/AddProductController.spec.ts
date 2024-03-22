import AddProductController from '@/controllers/AddProductController';
import { IAddProductRepositoryOutput } from '@/protocols/repositories/IAddProductRepository';
import IAddProductService, {
  IAddProductServiceInput,
} from '@/protocols/services/IAddProductService';
import {
  mockProductWithoutId,
  mockProductWithoutIdAndDescription,
  mockProductWithoutIdAndEmptyDescription,
  mockProductWithoutIdAndEmptyName,
  mockProductWithoutIdAndInvalidPrice,
  mockProductWithoutIdAndName,
  mockProductWithoutIdAndPrice,
} from '@/tests/mocks/data/mockProduct';

class AddProductServiceSpy implements IAddProductService {
  params!: IAddProductServiceInput;
  result = true;

  async execute(params: IAddProductServiceInput): IAddProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const addProductService = new AddProductServiceSpy();
  const sut = new AddProductController(addProductService);

  return { sut, addProductService };
};

describe('AddProductController', () => {
  test('Should return 201 code on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ body: mockProductWithoutId() });

    expect(response.status).toBe(201);
  });

  test('Should throw when request body is empty', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: {} });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when name is empty', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: mockProductWithoutIdAndEmptyName() });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when description is empty', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({
      body: mockProductWithoutIdAndEmptyDescription(),
    });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when name is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: mockProductWithoutIdAndName() });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when description is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: mockProductWithoutIdAndDescription() });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when price is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: mockProductWithoutIdAndPrice() });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when price is negative', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ body: mockProductWithoutIdAndInvalidPrice() });

    await expect(promise).rejects.toThrow();
  });

  test('Should call AddProductService with correct values', async () => {
    const { sut, addProductService } = makeSut();

    const product = mockProductWithoutId();

    const response = await sut.handle({ body: product });

    expect(response.status).toBe(201);
    expect(addProductService.params).toEqual(product);
  });

  test('Should return 500 when AddProductService returns false', async () => {
    const { sut, addProductService } = makeSut();
    addProductService.result = false;

    const product = mockProductWithoutId();

    const response = await sut.handle({ body: product });

    expect(response.status).toBe(500);
  });
});

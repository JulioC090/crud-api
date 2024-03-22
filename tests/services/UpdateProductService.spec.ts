import UpdateProductService from '@/services/UpdateProductService';
import {
  mockProductId,
  mockProductWithoutId,
} from '@/tests/mocks/data/mockProduct';
import UpdateProductRepositorySpy from '@/tests/mocks/repositories/UpdateProductRepositorySpy';

const makeSut = () => {
  const updateProductRepositorySpy = new UpdateProductRepositorySpy();
  const sut = new UpdateProductService(updateProductRepositorySpy);
  return { sut, updateProductRepositorySpy };
};

describe('UpdateProductService', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: mockProductId(),
      partialProduct: mockProductWithoutId(),
    });
    expect(result).toBeTruthy();
  });

  test('Should return false if the id string is empty', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: '',
      partialProduct: mockProductWithoutId(),
    });
    expect(result).toBeFalsy();
  });

  test('Should return false if the partialProduct object is empty', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: mockProductId(),
      partialProduct: {},
    });
    expect(result).toBeFalsy();
  });

  test('Should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositorySpy } = makeSut();

    const updateProduct = {
      id: mockProductId(),
      partialProduct: mockProductWithoutId(),
    };

    await sut.execute(updateProduct);
    expect(updateProductRepositorySpy.params).toEqual(updateProduct);
  });

  test('Should return false if UpdateProductRepository returns false', async () => {
    const { sut, updateProductRepositorySpy } = makeSut();
    updateProductRepositorySpy.result = false;
    const result = await sut.execute({
      id: mockProductId(),
      partialProduct: mockProductWithoutId(),
    });
    expect(result).toBeFalsy();
  });
});

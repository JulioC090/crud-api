import DeleteProductService from '@/services/DeleteProductService';
import { mockProductId } from '@/tests/mocks/data/mockProduct';
import DeleteProductRepositorySpy from '@/tests/mocks/repositories/DeleteProductRepositorySpy';

const makeSut = () => {
  const deleteProductRepositorySpy = new DeleteProductRepositorySpy();
  const sut = new DeleteProductService(deleteProductRepositorySpy);
  return { sut, deleteProductRepositorySpy };
};

describe('DeleteProductService', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(mockProductId());
    expect(result).toBeTruthy();
  });

  test('Should return false if the id string is empty', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('');
    expect(result).toBeFalsy();
  });

  test('Should return false if DeleteProductRepository returns false', async () => {
    const { sut, deleteProductRepositorySpy } = makeSut();
    deleteProductRepositorySpy.result = false;
    const result = await sut.execute(mockProductId());
    expect(result).toBeFalsy();
  });

  test('Should call DeleteProductRepository with correct values', async () => {
    const { sut, deleteProductRepositorySpy } = makeSut();
    const id = mockProductId();
    await sut.execute(id);
    expect(deleteProductRepositorySpy.params).toEqual({ id });
  });
});

import {
  IAddProductRepository,
  IAddProductRepositoryInput,
  IAddProductRepositoryOutput,
} from '@/protocols/repositories/IAddProductRepository';
import AddProductService from '@/services/AddProductService';
import { mockProductWithoutId } from '@/tests/mocks/data/mockProduct';

class AddProductRepositorySpy implements IAddProductRepository {
  public params!: IAddProductRepositoryInput;
  public result = true;

  async add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput {
    this.params = data;
    return this.result;
  }
}

const makeSut = () => {
  const addProductRepositorySpy = new AddProductRepositorySpy();
  const sut = new AddProductService(addProductRepositorySpy);
  return { sut, addProductRepositorySpy };
};

describe('AddProductService', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const product = mockProductWithoutId();
    const { sut, addProductRepositorySpy } = makeSut();
    await sut.execute(product);
    expect(addProductRepositorySpy.params).toEqual({ product });
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(mockProductWithoutId());
    expect(result).toBe(true);
  });

  test('Should return false if AddProductRepository returns false', async () => {
    const { sut, addProductRepositorySpy } = makeSut();
    addProductRepositorySpy.result = false;
    const result = await sut.execute(mockProductWithoutId());
    expect(result).toBeFalsy();
  });

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut();
    jest
      .spyOn(addProductRepositorySpy, 'add')
      .mockImplementationOnce((): never => {
        throw new Error();
      });
    const promise = sut.execute(mockProductWithoutId());
    await expect(promise).rejects.toThrow();
  });
});

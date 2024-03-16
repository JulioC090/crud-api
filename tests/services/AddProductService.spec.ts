import {
  IAddProductRepository,
  IAddProductRepositoryInput,
  IAddProductRepositoryOutput,
} from '@/protocols/repositories/IAddProductRepository';
import AddProductService from '@/services/AddProductService';

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

const product = {
  name: 'Produto 1',
  description: 'Descrição do Produto',
  price: 19.99,
};

describe('AddProductService', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy } = makeSut();
    await sut.execute(product);
    expect(addProductRepositorySpy.params).toEqual({ product });
  });

  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(product);
    expect(result).toBe(true);
  });

  test('Should return false if AddProductRepository returns false', async () => {
    const { sut, addProductRepositorySpy } = makeSut();
    addProductRepositorySpy.result = false;
    const result = await sut.execute(product);
    expect(result).toBeFalsy();
  });

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut();
    jest
      .spyOn(addProductRepositorySpy, 'add')
      .mockImplementationOnce((): never => {
        throw new Error();
      });
    const promise = sut.execute(product);
    await expect(promise).rejects.toThrow();
  });
});

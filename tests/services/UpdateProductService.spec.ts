import {
  IUpdateProductRepository,
  IUpdateProductRepositoryInput,
  IUpdateProductRepositoryOutput,
} from '@/protocols/repositories/IUpdateProductRepository';
import UpdateProductService from '@/services/UpdateProductService';

class UpdateProductRepositorySpy implements IUpdateProductRepository {
  params!: IUpdateProductRepositoryInput;
  result = true;

  async update(
    params: IUpdateProductRepositoryInput,
  ): IUpdateProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const updateProductRepositorySpy = new UpdateProductRepositorySpy();
  const sut = new UpdateProductService(updateProductRepositorySpy);
  return { sut, updateProductRepositorySpy };
};

describe('UpdateProductService', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: 'id_valido',
      partialProduct: { name: 'novo_nome' },
    });
    expect(result).toBeTruthy();
  });

  test('Should return false if the id string is empty', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: '',
      partialProduct: { name: 'novo_nome' },
    });
    expect(result).toBeFalsy();
  });

  test('Should return false if the partialProduct object is empty', async () => {
    const { sut } = makeSut();
    const result = await sut.execute({
      id: 'id_valido',
      partialProduct: {},
    });
    expect(result).toBeFalsy();
  });

  test('Should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositorySpy } = makeSut();
    await sut.execute({
      id: 'id_valido',
      partialProduct: { name: 'novo_nome' },
    });
    expect(updateProductRepositorySpy.params).toEqual({
      id: 'id_valido',
      partialProduct: { name: 'novo_nome' },
    });
  });

  test('Should return false if UpdateProductRepository returns false', async () => {
    const { sut, updateProductRepositorySpy } = makeSut();
    updateProductRepositorySpy.result = false;
    const result = await sut.execute({
      id: 'id_valido',
      partialProduct: { name: 'novo_nome' },
    });
    expect(result).toBeFalsy();
  });
});

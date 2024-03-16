import {
  IDeleteProductRepository,
  IDeleteProductRepositoryInput,
  IDeleteProductRepositoryOutput,
} from '@/protocols/repositories/IDeleteProductRepository';
import DeleteProductService from '@/services/DeleteProductService';

class DeleteProductRepositorySpy implements IDeleteProductRepository {
  params!: IDeleteProductRepositoryInput;
  result = true;

  async delete(
    params: IDeleteProductRepositoryInput,
  ): IDeleteProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const deleteProductRepositorySpy = new DeleteProductRepositorySpy();
  const sut = new DeleteProductService(deleteProductRepositorySpy);
  return { sut, deleteProductRepositorySpy };
};

describe('DeleteProductService', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.execute('id_valido');
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
    const result = await sut.execute('id_valido');
    expect(result).toBeFalsy();
  });

  test('Should call DeleteProductRepository with correct values', async () => {
    const { sut, deleteProductRepositorySpy } = makeSut();
    await sut.execute('id_valido');
    expect(deleteProductRepositorySpy.params).toEqual({ id: 'id_valido' });
  });
});

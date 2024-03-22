import {
  IListProductsRepository,
  IListProductsRepositoryOutput,
} from '@/protocols/repositories/IListProductsRepository';
import ListProductsService from '@/services/ListProductsService';
import { mockProducts } from '@/tests/mocks/data/mockProduct';

class ListProductsRepositorySpy implements IListProductsRepository {
  result = mockProducts(5);

  async list(): IListProductsRepositoryOutput {
    return this.result;
  }
}

const makeSut = () => {
  const listProductsRepositorySpy = new ListProductsRepositorySpy();
  const sut = new ListProductsService(listProductsRepositorySpy);
  return { sut, listProductsRepositorySpy };
};

describe('ListProductsService', () => {
  test('Should return the list of products from ListProductsRepository', async () => {
    const { sut, listProductsRepositorySpy } = makeSut();
    const result = await sut.execute();
    expect(listProductsRepositorySpy.result).toEqual(result);
  });
});

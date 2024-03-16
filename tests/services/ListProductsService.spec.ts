import {
  IListProductsRepository,
  IListProductsRepositoryOutput,
} from '@/protocols/repositories/IListProductsRepository';
import ListProductsService from '@/services/ListProductsService';

class ListProductsRepositorySpy implements IListProductsRepository {
  result = [
    {
      id: 'id1',
      name: 'Produto 1',
      description: 'Descrição do Produto 1',
      price: 19.99,
    },
    {
      id: 'id2',
      name: 'Produto 2',
      description: 'Descrição do Produto 2',
      price: 29.99,
    },
  ];

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

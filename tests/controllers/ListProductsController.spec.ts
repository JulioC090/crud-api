import ListProductsController from '@/controllers/ListProductsController';
import IListProductsService, {
  IListProductsServiceOutput,
} from '@/protocols/services/IListProductsService';

class ListProductsServiceSpy implements IListProductsService {
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

  async execute(): IListProductsServiceOutput {
    return this.result;
  }
}

const makeSut = () => {
  const listProductsService = new ListProductsServiceSpy();
  const sut = new ListProductsController(listProductsService);

  return { sut, listProductsService };
};

describe('ListProductsController', () => {
  test('Should return 200 code on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle();

    expect(response.status).toBe(200);
  });

  test('Should return the list of products from ListProductsService', async () => {
    const { sut, listProductsService } = makeSut();
    const response = await sut.handle();

    expect(response.data).toBe(listProductsService.result);
  });
});

import ListProductsController from '@/controllers/ListProductsController';
import ListProductsServiceSpy from '@/tests/mocks/services/ListProductsServiceSpy';

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

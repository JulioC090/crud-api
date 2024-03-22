import ListProductsService from '@/services/ListProductsService';
import ListProductsRepositorySpy from '@/tests/mocks/repositories/ListProductsRepositorySpy';

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

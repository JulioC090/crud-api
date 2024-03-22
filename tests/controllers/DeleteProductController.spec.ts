import DeleteProductController from '@/controllers/DeleteProductController';
import { mockProductId } from '@/tests/mocks/data/mockProduct';
import DeleteProductServiceSpy from '@/tests/mocks/services/DeleteProductServiceSpy';

const makeSut = () => {
  const deleteProductService = new DeleteProductServiceSpy();
  const sut = new DeleteProductController(deleteProductService);

  return { sut, deleteProductService };
};

const id = mockProductId();

describe('DeleteProductController', () => {
  test('Should return 200 code on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: { id } });

    expect(response.status).toBe(200);
  });

  test('Should throw when id is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ params: {} });

    await expect(promise).rejects.toThrow();
  });

  test('Should throw when id is empty', async () => {
    const { sut } = makeSut();

    const promise = sut.handle({ params: { id: '' } });

    await expect(promise).rejects.toThrow();
  });

  test('Should call DeleteProductService with correct values', async () => {
    const { sut, deleteProductService } = makeSut();

    await sut.handle({ params: { id } });

    expect(deleteProductService.params).toBe(id);
  });

  test('Should return 500 when DeleteProductService returns false', async () => {
    const { sut, deleteProductService } = makeSut();
    deleteProductService.result = false;

    const response = await sut.handle({ params: { id } });

    expect(response.status).toBe(500);
  });
});

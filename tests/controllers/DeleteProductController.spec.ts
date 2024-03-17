import DeleteProductController from '@/controllers/DeleteProductController';
import { IDeleteProductRepositoryOutput } from '@/protocols/repositories/IDeleteProductRepository';
import IDeleteProductService, {
  IDeleteProductServiceInput,
} from '@/protocols/services/IDeleteProductService';

class DeleteProductServiceSpy implements IDeleteProductService {
  params!: IDeleteProductServiceInput;
  result = true;

  async execute(
    params: IDeleteProductServiceInput,
  ): IDeleteProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const deleteProductService = new DeleteProductServiceSpy();
  const sut = new DeleteProductController(deleteProductService);

  return { sut, deleteProductService };
};

describe('DeleteProductController', () => {
  test('Should return 200 code on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: { id: 'id_valido' } });

    expect(response.status).toBe(200);
  });

  test('Should return 500 when id is undefined', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: {} });

    expect(response.status).toBe(500);
  });

  test('Should return 500 when id is empty', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: { id: '' } });

    expect(response.status).toBe(500);
  });

  test('Should call DeleteProductService with correct values', async () => {
    const { sut, deleteProductService } = makeSut();

    await sut.handle({ params: { id: 'id_valido' } });

    expect(deleteProductService.params).toBe('id_valido');
  });

  test('Should return 500 when DeleteProductService returns false', async () => {
    const { sut, deleteProductService } = makeSut();
    deleteProductService.result = false;

    const response = await sut.handle({ params: { id: 'id_valido' } });

    expect(response.status).toBe(500);
  });
});

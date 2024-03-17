import UpdateProductController from '@/controllers/UpdateProductController';
import IUpdateProductService, {
  IUpdateProductServiceInput,
  IUpdateProductServiceOutput,
} from '@/protocols/services/IUpdateProductService';

class UpdateProductServiceSpy implements IUpdateProductService {
  params!: IUpdateProductServiceInput;
  result = true;

  async execute(
    params: IUpdateProductServiceInput,
  ): IUpdateProductServiceOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const updateProductService = new UpdateProductServiceSpy();
  const sut = new UpdateProductController(updateProductService);

  return { sut, updateProductService };
};

describe('UpdateProductController', () => {
  test('Should return 200 code on success', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: { name: 'Test Product' },
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(200);
  });

  test('Should return 400 when id is undefined', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: {} });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when id is empty', async () => {
    const { sut } = makeSut();

    const response = await sut.handle({ params: { id: '' } });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when request body is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: {},
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(400);
  });

  test('Should return 400 when name is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: {
        name: '',
        description: 'Test Description',
        price: 10.99,
      },
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(400);
  });

  test('Should return 400 when description is empty', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: {
        name: 'Test Product',
        description: '',
        price: 10.99,
      },
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is negative', async () => {
    const { sut } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: {
        name: 'Test Product',
        description: '',
        price: -10.99,
      },
    };
    const response = await sut.handle(request);

    expect(response.status).toBe(400);
  });

  test('Should call UpdateProductService with correct values', async () => {
    const { sut, updateProductService } = makeSut();

    const request = {
      params: { id: 'id_valido' },
      body: { name: 'Test Product' },
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(200);
    expect(updateProductService.params).toEqual({
      id: request.params.id,
      partialProduct: request.body,
    });
  });

  test('Should return 500 when UpdateProductService returns false', async () => {
    const { sut, updateProductService } = makeSut();
    updateProductService.result = false;

    const request = {
      params: { id: 'id_valido' },
      body: { name: 'Test Product' },
    };

    const response = await sut.handle(request);

    expect(response.status).toBe(500);
  });
});

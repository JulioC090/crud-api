import AddProductController from '@/controllers/AddProductController';
import { IAddProductRepositoryOutput } from '@/protocols/repositories/IAddProductRepository';
import IAddProductService, {
  IAddProductServiceInput,
} from '@/protocols/services/IAddProductService';

class AddProductServiceSpy implements IAddProductService {
  params!: IAddProductServiceInput;
  result = true;

  async execute(params: IAddProductServiceInput): IAddProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

const makeSut = () => {
  const addProductService = new AddProductServiceSpy();
  const sut = new AddProductController(addProductService);

  return { sut, addProductService };
};

describe('AddProductController', () => {
  test('Should return 201 code on success', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(201);
  });

  test('Should return 400 when request body is empty', async () => {
    const { sut } = makeSut();

    const requestBody = {};

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when name is empty', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: 'Test Product',
      description: '',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when description is empty', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: '',
      description: 'Test Description',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when name is undefined', async () => {
    const { sut } = makeSut();

    const requestBody = {
      description: 'Test Description',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when description is undefined', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: 'Test Product',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is undefined', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: 'Test Product',
      description: 'Test Description',
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is negative', async () => {
    const { sut } = makeSut();

    const requestBody = {
      name: 'Test Product',
      description: 'Test Description',
      price: -10,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(400);
  });

  test('Should call AddProductService with correct values', async () => {
    const { sut, addProductService } = makeSut();

    const requestBody = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(201);
    expect(addProductService.params).toEqual(requestBody);
  });

  test('Should return 500 when AddProductService returns false', async () => {
    const { sut, addProductService } = makeSut();
    addProductService.result = false;

    const requestBody = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    };

    const response = await sut.handle({ body: requestBody });

    expect(response.status).toBe(500);
  });
});

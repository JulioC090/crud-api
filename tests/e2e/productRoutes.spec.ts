import MongoDBHelper from '@/helpers/MongoDBHelper';
import buildServer from '@/main/app';
import {
  mockProductWithoutId,
  mockProductWithoutIdAndDescription,
  mockProductWithoutIdAndInvalidPrice,
  mockProductWithoutIdAndName,
  mockProductWithoutIdAndPrice,
} from '@/tests/mocks/data/mockProduct';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

let app: FastifyInstance;

beforeAll(async () => {
  await MongoDBHelper.connect(process.env.MONGO_URL as string);
  app = buildServer();
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('GET /products', () => {
  test('Should return 200 on products with products list', async () => {
    const response = await request(app.server).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

describe('POST /product', () => {
  test('Should return 201 code on success', async () => {
    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutId());
    expect(response.status).toBe(201);
  });

  test('Should add a product in GET /products', async () => {
    const firstGetResponse = await request(app.server).get('/products');

    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutId());
    expect(response.status).toBe(201);

    const secondGetResponse = await request(app.server).get('/products');

    expect(secondGetResponse.body > firstGetResponse.body).toBeTruthy();
  });

  test('Should return 400 when request body is empty', async () => {
    const response = await request(app.server).post('/product');
    expect(response.status).toBe(400);
  });

  test('Should return 400 when name is undefined', async () => {
    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutIdAndName());
    expect(response.status).toBe(400);
  });

  test('Should return 400 when description is undefined', async () => {
    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutIdAndDescription());
    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is undefined', async () => {
    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutIdAndPrice());
    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is negative', async () => {
    const response = await request(app.server)
      .post('/product')
      .send(mockProductWithoutIdAndInvalidPrice());
    expect(response.status).toBe(400);
  });
});

describe('PUT /product', () => {
  test('Should return 200 code on success', async () => {
    const getResponse = await request(app.server).get('/products');
    const response = await request(app.server)
      .put(encodeURI(`/product/${getResponse.body[0].id}`))
      .send(mockProductWithoutId());

    expect(response.status).toBe(200);
  });

  test('Should change product value', async () => {
    const firstGetResponse = await request(app.server).get('/products');

    const partialProduct = mockProductWithoutId();

    await request(app.server)
      .put(encodeURI(`/product/${firstGetResponse.body[0].id}`))
      .send(partialProduct);

    const secondGetResponse = await request(app.server).get('/products');

    const editedProduct = secondGetResponse.body.filter(
      (product: { id: string }) => product.id === firstGetResponse.body[0].id,
    );

    expect(editedProduct[0]).toEqual({
      ...firstGetResponse.body[0],
      ...partialProduct,
    });
  });

  test('Should return 400 when id is undefined', async () => {
    const response = await request(app.server)
      .put('/product/')
      .send(mockProductWithoutId());

    expect(response.status).toBe(400);
  });
});

describe('DELETE /product', () => {
  test('Should return 200 code on success', async () => {
    const getResponse = await request(app.server).get('/products');
    const response = await request(app.server).delete(
      encodeURI(`/product/${getResponse.body[0].id}`),
    );

    expect(response.status).toBe(200);
  });

  test('Should return 400 when id is undefined', async () => {
    const response = await request(app.server).delete(encodeURI('/product/'));

    expect(response.status).toBe(400);
  });

  test('Should delete the product', async () => {
    const firstGetResponse = await request(app.server).get('/products');
    await request(app.server).delete(
      encodeURI(`/product/${firstGetResponse.body[0].id}`),
    );

    const secondGetResponse = await request(app.server).get('/products');

    expect(firstGetResponse.body > secondGetResponse.body).toBeTruthy();
  });
});

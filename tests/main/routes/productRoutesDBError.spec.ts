import buildServer from '@/main/app';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

let app: FastifyInstance;

beforeAll(async () => {
  app = buildServer();
  await app.ready();
});

afterAll(() => {
  app.close();
});

describe('GET /products', () => {
  test('Should return 500 when Database is not defined', async () => {
    const response = await request(app.server).get('/products');
    expect(response.status).toBe(500);
  });
});

describe('POST /product', () => {
  test('Should return 500 when Database is not defined', async () => {
    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    });
    expect(response.status).toBe(500);
  });
});

describe('PUT /product', () => {
  test('Should return 500 when Database is not defined', async () => {
    const response = await request(app.server)
      .put(encodeURI('/product/id_valido'))
      .send({ name: 'New_Name' });

    expect(response.status).toBe(500);
  });
});

describe('DELETE /product', () => {
  test('Should return 500 when Database is not defined', async () => {
    const response = await request(app.server).delete(
      encodeURI('/product/id_valido'),
    );

    expect(response.status).toBe(500);
  });
});

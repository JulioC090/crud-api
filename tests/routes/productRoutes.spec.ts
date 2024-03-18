import MongoDBHelper from '@/helpers/MongoDBHelper';
import app from '@/index';
import request from 'supertest';

beforeAll(async () => {
  await MongoDBHelper.connect(process.env.MONGO_URL as string);
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
    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    });
    expect(response.status).toBe(201);
  });

  test('Should add a product in GET /products', async () => {
    const firstGetResponse = await request(app.server).get('/products');
    expect(
      Array.isArray(firstGetResponse.body) &&
        firstGetResponse.body.length === 1,
    ).toBeTruthy();

    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      description: 'Test Description',
      price: 10.99,
    });
    expect(response.status).toBe(201);

    const secondGetResponse = await request(app.server).get('/products');
    expect(
      Array.isArray(secondGetResponse.body) &&
        secondGetResponse.body.length === 2,
    ).toBeTruthy();
  });

  test('Should return 400 when request body is empty', async () => {
    const response = await request(app.server).post('/product');
    expect(response.status).toBe(400);
  });

  test('Should return 400 when name is undefined', async () => {
    const response = await request(app.server).post('/product').send({
      description: 'Test Description',
      price: 10.99,
    });
    expect(response.status).toBe(400);
  });

  test('Should return 400 when description is undefined', async () => {
    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      price: 10.99,
    });
    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is undefined', async () => {
    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      description: 'Test Description',
    });
    expect(response.status).toBe(400);
  });

  test('Should return 400 when price is negative', async () => {
    const response = await request(app.server).post('/product').send({
      name: 'Test Product',
      description: 'Test Description',
      price: -10.99,
    });
    expect(response.status).toBe(400);
  });

  describe('PUT /product', () => {
    test('Should return 200 code on success', async () => {
      const getResponse = await request(app.server).get('/products');
      const response = await request(app.server)
        .put(encodeURI(`/product/${getResponse.body[0].id}`))
        .send({ name: 'New_Name' });

      expect(response.status).toBe(200);
    });

    test('Should change product value', async () => {
      const firstGetResponse = await request(app.server).get('/products');
      await request(app.server)
        .put(encodeURI(`/product/${firstGetResponse.body[0].id}`))
        .send({ price: 120 });

      const secondGetResponse = await request(app.server).get('/products');

      const editedProduct = secondGetResponse.body.filter(
        (product: { id: string }) => product.id === firstGetResponse.body[0].id,
      );

      expect(editedProduct[0].price).toBe(120);
    });

    test('Should return 400 when id is undefined', async () => {
      const response = await request(app.server)
        .put('/product/')
        .send({ name: 'New_Name' });

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

    test('Should return 500 when id is undefined', async () => {
      const response = await request(app.server).delete(encodeURI('/product/'));

      expect(response.status).toBe(500);
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
});

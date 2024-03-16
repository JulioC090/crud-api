import server from '@/index';
import request from 'supertest';

afterAll(() => {
  server.close();
});

describe('GET /products', () => {
  test('Should return 200 on products with products list', async () => {
    await server.ready();

    const response = await request(server.server).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        name: 'Produto 1',
        description: 'Descrição do Produto',
        price: 19.99,
      },
    ]);
  });
});

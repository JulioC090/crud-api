import AddProductController from '@/controllers/AddProductController';
import DeleteProductController from '@/controllers/DeleteProductController';
import ListProductsController from '@/controllers/ListProductsController';
import UpdateProductController from '@/controllers/UpdateProductController';
import AddProductMongoDBRepository from '@/repositories/AddProductMongoDBRepository';
import DeleteProductMongoDBRepository from '@/repositories/DeleteProductMongoDBRepository';
import ListProductMongoDBRepository from '@/repositories/ListProductMongoDBRepository';
import UpdateProductMongoDBRepository from '@/repositories/UpdateProductMongoDBRepository';
import AddProductService from '@/services/AddProductService';
import DeleteProductService from '@/services/DeleteProductService';
import ListProductsService from '@/services/ListProductsService';
import UpdateProductService from '@/services/UpdateProductService';
import { FastifyInstance } from 'fastify';

const listProductRepository = new ListProductMongoDBRepository();
const listProductsService = new ListProductsService(listProductRepository);
const listProductsController = new ListProductsController(listProductsService);

const addProductRepository = new AddProductMongoDBRepository();
const addProductService = new AddProductService(addProductRepository);
const addProductController = new AddProductController(addProductService);

const updateProductRepository = new UpdateProductMongoDBRepository();
const updateProductService = new UpdateProductService(updateProductRepository);
const updateProductController = new UpdateProductController(
  updateProductService,
);

const deleteProductRepository = new DeleteProductMongoDBRepository();
const deleteProductService = new DeleteProductService(deleteProductRepository);
const deleteProductController = new DeleteProductController(
  deleteProductService,
);

export default async function (app: FastifyInstance) {
  app.get('/products', async (request, reply) => {
    const response = await listProductsController.handle();
    return reply.code(response.status).send(response.data);
  });

  app.post('/product', async (request, reply) => {
    const response = await addProductController.handle(request);
    return reply.code(response.status).send(response.data);
  });

  app.put('/product/:id', async (request, reply) => {
    const response = await updateProductController.handle(request);
    return reply.code(response.status).send(response.data);
  });

  app.delete('/product/:id', async (request, reply) => {
    const response = await deleteProductController.handle(request);
    return reply.code(response.status).send(response.data);
  });
}

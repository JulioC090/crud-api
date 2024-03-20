import errorHandle from '@/main/errorHandle';
import productRoutes from '@/main/routes/productRoutes';
import cors from '@fastify/cors';
import fastify from 'fastify';

function buildServer(port: number = 3000, opts = {}) {
  const app = fastify(opts);
  app.register(cors);
  app.setErrorHandler((error, request, reply) => {
    const response = errorHandle({
      message: error.message,
      statusCode: 400,
    });
    return reply.code(response.status).send(response.data);
  });
  app.register(productRoutes);
  app.listen({ port }, (err, address) => {
    console.log(`Server is now listening on ${address}`);
  });
  return app;
}

export default buildServer;

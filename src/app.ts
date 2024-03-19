import productRoutes from '@/routes/productRoutes';
import cors from '@fastify/cors';
import fastify from 'fastify';

function buildServer(port: number = 3000, opts = {}) {
  const app = fastify(opts);
  app.register(cors);
  app.register(productRoutes);
  app.listen({ port }, (err, address) => {
    console.log(`Server is now listening on ${address}`);
  });
  return app;
}

export default buildServer;

import productRoutes from '@/routes/productRoutes';
import fastify from 'fastify';

function build(opts = {}) {
  const app = fastify(opts);
  app.register(productRoutes);
  return app;
}

export default build;

import fastify from 'fastify';

function build(opts = {}) {
  const app = fastify(opts);

  app.get('/products', (request, reply) => {
    reply.send([
      { name: 'Produto 1', description: 'Descrição do Produto', price: 19.99 },
    ]);
  });

  return app;
}

export default build;

import Fastify from 'fastify';
const server = Fastify();

server.get('/products', (request, reply) => {
  reply.send([
    { name: 'Produto 1', description: 'Descrição do Produto', price: 19.99 },
  ]);
});

server.listen({ port: 3000 }, (err, address) => {
  console.log(`Server is now listening on ${address}`);
});

export default server;

import 'dotenv/config';
import Fastify from 'fastify';

const server = Fastify();
const port = parseInt(process.env.PORT as string) || 3000;

server.get('/products', (request, reply) => {
  reply.send([
    { name: 'Produto 1', description: 'Descrição do Produto', price: 19.99 },
  ]);
});

server.listen({ port }, (err, address) => {
  console.log(`Server is now listening on ${address}`);
});

export default server;

import Fastify from 'fastify';
const fastify = Fastify();

fastify.get('/products', function (request, reply) {
    reply.send(
        { 
            products: [
                {name: "Produto 1", description: "Descrição do Produto", price: 19.99}
            ] 
        }
    )
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`);
})
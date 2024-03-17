import build from '@/app';
import 'dotenv/config';

const server = build();
const port = parseInt(process.env.PORT as string) || 3000;

server.listen({ port }, (err, address) => {
  console.log(`Server is now listening on ${address}`);
});

export default server;

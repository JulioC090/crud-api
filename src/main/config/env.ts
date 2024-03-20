import 'dotenv/config';
import * as env from 'env-var';

export default {
  serverPort: env.get('SERVER_PORT').default(3000).asPortNumber(),
  dbHost: env.get('DB_HOST').default('127.0.0.1').asString(),
  dbPort: env.get('DB_PORT').default(27017).asPortNumber(),
  dbName: env.get('DB_NAME').default('').asString(),
  dbUser: env.get('DB_USER').default('').asString(),
  dbPass: env.get('DB_PASS').default('').asString(),
};

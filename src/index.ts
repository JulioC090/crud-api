import buildServer from '@/app';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import 'dotenv/config';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const port = parseInt(process.env.SERVER_PORT as string);

MongoDBHelper.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
)
  .then(async () => {
    buildServer(port);
  })
  .catch(console.error);

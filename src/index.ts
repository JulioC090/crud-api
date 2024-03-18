import buildServer from '@/app';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import 'dotenv/config';

const port = parseInt(process.env.PORT as string);

MongoDBHelper.connect(process.env.MONGO_URL as string)
  .then(async () => {
    buildServer(port);
  })
  .catch(console.error);

import MongoDBHelper from '@/helpers/MongoDBHelper';
import buildServer from '@/main/app';
import env from '@/main/config/env';

const uri = env.dbUser
  ? `mongodb://${env.dbUser}:${env.dbPass}@${env.dbHost}:${env.dbPort}/${env.dbName}?authSource=admin`
  : `mongodb://${env.dbHost}:${env.dbPort}/${env.dbName}`;

MongoDBHelper.connect(uri)
  .then(async () => {
    buildServer(env.serverPort);
  })
  .catch(console.error);

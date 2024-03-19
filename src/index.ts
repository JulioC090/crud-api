import buildServer from '@/app';
import env from '@/env';
import MongoDBHelper from '@/helpers/MongoDBHelper';

const uri = env.dbUser
  ? `mongodb://${env.dbUser}:${env.dbPass}@${env.dbHost}:${env.dbPort}/${env.dbName}?authSource=admin`
  : `mongodb://${env.dbHost}:${env.dbPort}/${env.dbName}`;

MongoDBHelper.connect(uri)
  .then(async () => {
    buildServer(env.serverPort);
  })
  .catch(console.error);

import MongoDBHelper from '@/helpers/MongoDBHelper';

const sut = MongoDBHelper;

describe('MongoDBHelper', () => {
  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should return undefined when getCollection() is invoked and uri is undefined', async () => {
    const collection = await sut.getCollection('valid_connection');
    expect(collection).toBeUndefined();
  });

  test('Should reconnect when getCollection() is invoked and client is disconnected', async () => {
    await sut.connect(process.env.MONGO_URL as string);
    expect(sut.db).toBeTruthy();
    await sut.disconnect();
    expect(sut.db).toBeFalsy();
    await sut.getCollection('users');
    expect(sut.db).toBeTruthy();
  });
});

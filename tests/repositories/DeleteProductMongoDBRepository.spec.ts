import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DeleteProductMongoDBRepository from '@/repositories/DeleteProductMongoDBRepository';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const makeSut = () => {
  const sut = new DeleteProductMongoDBRepository();
  return { sut };
};

const product = {
  id: 'id_valido',
  name: 'Produto 1',
  description: 'Descrição do Produto',
  price: 19.99,
};

describe('DeleteProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should return false when products collection is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.delete({ id: 'id_valido' });
    await expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    const { sut } = makeSut();
    const response = await sut.delete({ id: 'id_valido' });

    expect(response).toBeTruthy();
  });

  test('Should delete product in the productCollection', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.delete({ id: 'id_valido' });

    const products = await productsCollection?.find({}).toArray();

    expect(products?.length === 0).toBeTruthy();
  });
});

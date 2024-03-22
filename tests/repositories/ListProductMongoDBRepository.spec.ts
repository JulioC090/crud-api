import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import ListProductMongoDBRepository from '@/repositories/ListProductMongoDBRepository';
import { mockProducts } from '@/tests/mocks/data/mockProduct';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const makeSut = () => {
  const sut = new ListProductMongoDBRepository();
  return { sut };
};

describe('ListProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should throw when products collection is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.list();
    await expect(promise).rejects.toThrow();
  });

  test('Should return an empty array when there are no products cataloged', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    const { sut } = makeSut();
    const response = await sut.list();

    expect(response).toEqual([]);
  });

  test('Should return a list of products when there are products cataloged', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();

    const { sut } = makeSut();
    const fakeProducts = mockProducts(5);

    await productsCollection?.insertMany(
      fakeProducts.map((product) => Object.assign({}, product)),
    );

    const response = await sut.list();

    expect(response).toEqual(fakeProducts);
  });
});

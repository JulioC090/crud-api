import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DeleteProductMongoDBRepository from '@/repositories/DeleteProductMongoDBRepository';
import { mockProduct, mockProductId } from '@/tests/mocks/data/mockProduct';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const makeSut = () => {
  const sut = new DeleteProductMongoDBRepository();
  return { sut };
};

const product = mockProduct();

describe('DeleteProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should return false when products collection is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.delete({ id: mockProductId() });
    await expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.delete({ id: product.id });

    expect(response).toBeTruthy();
  });

  test('Should delete product in the productCollection', async () => {
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.delete({ id: product.id });

    const products = await productsCollection?.find({}).toArray();

    expect(products?.length === 0).toBeTruthy();
  });
});

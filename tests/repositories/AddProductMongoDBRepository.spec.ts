import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import AddProductMongoDBRepository from '@/repositories/AddProductMongoDBRepository';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const product = {
  name: 'Produto 1',
  description: 'Descrição do Produto',
  price: 19.99,
};

const makeSut = () => {
  const sut = new AddProductMongoDBRepository();
  return { sut };
};

describe('AddProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should return false when products collection is undefined', async () => {
    const { sut } = makeSut();
    const response = await sut.add({ product });

    expect(response).toBeFalsy();
  });

  test('Should return true on success', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    const { sut } = makeSut();
    const response = await sut.add({ product });

    expect(response).toBeTruthy();
  });

  test('Should save product in the productCollection', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();

    const { sut } = makeSut();
    await sut.add({ product });

    const products = await productsCollection?.find({}).toArray();

    expect(products!.length > 0).toBeTruthy();
  });

  test('Should save product in the productCollection with different id', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();

    const { sut } = makeSut();
    await sut.add({ product });
    await sut.add({ product });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0].id != products![1].id).toBeTruthy();
  });
});

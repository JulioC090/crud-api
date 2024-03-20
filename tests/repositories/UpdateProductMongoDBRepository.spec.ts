import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import UpdateProductMongoDBRepository from '@/repositories/UpdateProductMongoDBRepository';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const makeSut = () => {
  const sut = new UpdateProductMongoDBRepository();
  return { sut };
};

const product = {
  id: 'id_valido',
  name: 'Produto 1',
  description: 'Descrição do Produto',
  price: 19.99,
};

const partialProduct = {
  name: 'Nome',
  description: 'Descrição',
  price: 1,
};

describe('UpdateProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should return false when products collection is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.update({ id: 'id_valido', partialProduct });
    await expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.update({ id: 'id_valido', partialProduct });

    expect(response).toBeTruthy();
  });

  test('Should update product in the productCollection', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.update({ id: 'id_valido', partialProduct });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({ ...product, ...partialProduct });
  });

  test('Should return false when partialProduct is empty', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.update({
      id: 'id_valido',
      partialProduct: {},
    });

    expect(response).toBeFalsy();
  });

  test('Should update only name when only name is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.update({
      id: 'id_valido',
      partialProduct: { name: 'nome_valido' },
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({ ...product, ...{ name: 'nome_valido' } });
  });

  test('Should update only description when only description is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.update({
      id: 'id_valido',
      partialProduct: { description: 'descrição_valida' },
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({
      ...product,
      ...{ description: 'descrição_valida' },
    });
  });

  test('Should update only price when only price is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.update({
      id: 'id_valido',
      partialProduct: { price: 1 },
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({
      ...product,
      ...{ price: 1 },
    });
  });

  test('Should return false when product do not exist', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();

    const { sut } = makeSut();
    const response = await sut.update({ id: 'id_valido', partialProduct });

    expect(response).toBeFalsy();
  });
});

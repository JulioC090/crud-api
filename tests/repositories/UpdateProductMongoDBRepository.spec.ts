import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import UpdateProductMongoDBRepository from '@/repositories/UpdateProductMongoDBRepository';
import {
  mockProduct,
  mockProductWithOnlyDescription,
  mockProductWithOnlyName,
  mockProductWithOnlyPrice,
  mockProductWithoutId,
} from '@/tests/mocks/data/mockProduct';
import { Collection } from 'mongodb';

let productsCollection: Collection<Product> | undefined;

const makeSut = () => {
  const sut = new UpdateProductMongoDBRepository();
  return { sut };
};

const product = mockProduct();
const partialProduct = mockProductWithoutId();

describe('UpdateProductMongoDBRepository', () => {
  afterAll(async () => {
    await MongoDBHelper.disconnect();
  });

  test('Should return false when products collection is undefined', async () => {
    const { sut } = makeSut();

    const promise = sut.update({ id: product.id, partialProduct });
    await expect(promise).rejects.toThrow();
  });

  test('Should return true on success', async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL as string);
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.update({
      id: product.id,
      partialProduct,
    });

    expect(response).toBeTruthy();
  });

  test('Should update product in the productCollection', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    await sut.update({
      id: product.id,
      partialProduct,
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({ ...product, ...partialProduct });
  });

  test('Should return false when partialProduct is empty', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.update({
      id: product.id,
      partialProduct: {},
    });

    expect(response).toBeFalsy();
  });

  test('Should update only name when only name is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const partialProduct = mockProductWithOnlyName();

    const { sut } = makeSut();
    await sut.update({
      id: product.id,
      partialProduct,
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({ ...product, ...partialProduct });
  });

  test('Should update only description when only description is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const partialProduct = mockProductWithOnlyDescription();

    const { sut } = makeSut();
    await sut.update({
      id: product.id,
      partialProduct,
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({
      ...product,
      ...partialProduct,
    });
  });

  test('Should update only price when only price is passed', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const partialProduct = mockProductWithOnlyPrice();

    const { sut } = makeSut();
    await sut.update({
      id: product.id,
      partialProduct,
    });

    const products = await productsCollection?.find({}).toArray();

    expect(products![0]).toEqual({
      ...product,
      ...partialProduct,
    });
  });

  test('Should return true when edit product with same values', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();
    await productsCollection?.insertOne(product);

    const { sut } = makeSut();
    const response = await sut.update({
      id: product.id,
      partialProduct: product,
    });

    expect(response).toBeTruthy();
  });

  test('Should return false when product do not exist', async () => {
    productsCollection = await MongoDBHelper.getCollection<Product>('products');
    await productsCollection?.deleteMany();

    const { sut } = makeSut();
    const response = await sut.update({ id: product.id, partialProduct });

    expect(response).toBeFalsy();
  });
});

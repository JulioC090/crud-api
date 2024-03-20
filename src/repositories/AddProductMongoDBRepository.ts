import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DBConnectionError from '@/main/errors/DBConnectionError';
import {
  IAddProductRepository,
  IAddProductRepositoryInput,
  IAddProductRepositoryOutput,
} from '@/protocols/repositories/IAddProductRepository';
import { randomUUID } from 'crypto';

class AddProductMongoDBRepository implements IAddProductRepository {
  async add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput {
    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    if (!productsCollection) throw new DBConnectionError();

    const product = { id: randomUUID(), ...data.product };
    const result = await productsCollection.insertOne(product);
    return result.acknowledged;
  }
}

export default AddProductMongoDBRepository;

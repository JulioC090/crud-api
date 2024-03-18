import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import {
  IAddProductRepository,
  IAddProductRepositoryInput,
  IAddProductRepositoryOutput,
} from '@/protocols/repositories/IAddProductRepository';
import { UUID } from 'mongodb';

class AddProductMongoDBRepository implements IAddProductRepository {
  async add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput {
    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    if (!productsCollection) return false;

    const product = { id: UUID.generate().toString(), ...data.product };
    productsCollection.insertOne(product);
    return true;
  }
}

export default AddProductMongoDBRepository;

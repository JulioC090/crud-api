import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import {
  IListProductsRepository,
  IListProductsRepositoryOutput,
} from '@/protocols/repositories/IListProductsRepository';

class ListProductMongoDBRepository implements IListProductsRepository {
  async list(): IListProductsRepositoryOutput {
    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    const products = (await productsCollection?.find({}).toArray()) || [];
    return products;
  }
}

export default ListProductMongoDBRepository;

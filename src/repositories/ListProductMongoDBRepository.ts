import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DBConnectionError from '@/main/errors/DBConnectionError';
import {
  IListProductsRepository,
  IListProductsRepositoryOutput,
} from '@/protocols/repositories/IListProductsRepository';

class ListProductMongoDBRepository implements IListProductsRepository {
  async list(): IListProductsRepositoryOutput {
    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    if (!productsCollection) throw new DBConnectionError();

    const products = await productsCollection
      ?.find({}, { projection: { _id: 0 } })
      .toArray();
    return products;
  }
}

export default ListProductMongoDBRepository;

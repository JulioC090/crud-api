import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DBConnectionError from '@/main/errors/DBConnectionError';
import {
  IDeleteProductRepository,
  IDeleteProductRepositoryInput,
  IDeleteProductRepositoryOutput,
} from '@/protocols/repositories/IDeleteProductRepository';

class DeleteProductMongoDBRepository implements IDeleteProductRepository {
  async delete(
    data: IDeleteProductRepositoryInput,
  ): IDeleteProductRepositoryOutput {
    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    if (!productsCollection) throw new DBConnectionError();

    const result = await productsCollection.deleteOne({ id: data.id });

    return result.acknowledged;
  }
}

export default DeleteProductMongoDBRepository;

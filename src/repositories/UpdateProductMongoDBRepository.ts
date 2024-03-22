import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
import DBConnectionError from '@/main/errors/DBConnectionError';
import {
  IUpdateProductRepository,
  IUpdateProductRepositoryInput,
  IUpdateProductRepositoryOutput,
} from '@/protocols/repositories/IUpdateProductRepository';

class UpdateProductMongoDBRepository implements IUpdateProductRepository {
  async update(
    data: IUpdateProductRepositoryInput,
  ): IUpdateProductRepositoryOutput {
    if (data.id.length < 1 || Object.keys(data.partialProduct).length === 0)
      return false;

    const productsCollection =
      await MongoDBHelper.getCollection<Product>('products');
    if (!productsCollection) throw new DBConnectionError();

    const response = await productsCollection.updateOne(
      { id: data.id },
      { $set: data.partialProduct },
    );

    return response.acknowledged && response.matchedCount > 0;
  }
}

export default UpdateProductMongoDBRepository;

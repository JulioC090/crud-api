import Product from '@/entities/Product';
import MongoDBHelper from '@/helpers/MongoDBHelper';
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
    if (!productsCollection) return false;

    const response = await productsCollection.updateOne(
      { id: data.id },
      { $set: data.partialProduct },
    );

    return response.acknowledged && response.modifiedCount > 0;
  }
}

export default UpdateProductMongoDBRepository;

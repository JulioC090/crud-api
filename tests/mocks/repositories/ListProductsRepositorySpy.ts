import {
  IListProductsRepository,
  IListProductsRepositoryOutput,
} from '@/protocols/repositories/IListProductsRepository';
import { mockProducts } from '@/tests/mocks/data/mockProduct';

class ListProductsRepositorySpy implements IListProductsRepository {
  result = mockProducts(5);

  async list(): IListProductsRepositoryOutput {
    return this.result;
  }
}

export default ListProductsRepositorySpy;

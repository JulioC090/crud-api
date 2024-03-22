import IListProductsService, {
  IListProductsServiceOutput,
} from '@/protocols/services/IListProductsService';
import { mockProducts } from '@/tests/mocks/data/mockProduct';

class ListProductsServiceSpy implements IListProductsService {
  result = mockProducts(5);

  async execute(): IListProductsServiceOutput {
    return this.result;
  }
}

export default ListProductsServiceSpy;

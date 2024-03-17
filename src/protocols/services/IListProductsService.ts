import Product from '@/entities/Product';

export type IListProductsServiceOutput = Promise<Array<Product>>;

interface IListProductsService {
  execute(): IListProductsServiceOutput;
}

export default IListProductsService;

import Product from '@/entities/Product';

export type IListProductsRepositoryOutput = Promise<Array<Product>>;

export interface IListProductsRepository {
  list(): IListProductsRepositoryOutput;
}

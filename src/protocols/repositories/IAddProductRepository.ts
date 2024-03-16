import Product from '@/entities/Product';

export type IAddProductRepositoryInput = {
  product: Product;
};

export type IAddProductRepositoryOutput = Promise<boolean>;

export interface IAddProductRepository {
  add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput;
}

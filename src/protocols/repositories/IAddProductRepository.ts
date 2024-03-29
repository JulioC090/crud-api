import Product from '@/entities/Product';

export type IAddProductRepositoryInput = {
  product: Omit<Product, 'id'>;
};

export type IAddProductRepositoryOutput = Promise<boolean>;

export interface IAddProductRepository {
  add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput;
}

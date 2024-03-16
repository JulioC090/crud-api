import Product from '@/entities/Product';

export type IUpdateProductRepositoryInput = {
  id: string;
  partialProduct: Partial<Omit<Product, 'id'>>;
};

export type IUpdateProductRepositoryOutput = Promise<boolean>;

export interface IUpdateProductRepository {
  update(data: IUpdateProductRepositoryInput): IUpdateProductRepositoryOutput;
}

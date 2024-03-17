import Product from '@/entities/Product';

export type IUpdateProductServiceInput = {
  id: string;
  partialProduct: Partial<Omit<Product, 'id'>>;
};

export type IUpdateProductServiceOutput = Promise<boolean>;

interface IUpdateProductService {
  execute(product: IUpdateProductServiceInput): IUpdateProductServiceOutput;
}

export default IUpdateProductService;

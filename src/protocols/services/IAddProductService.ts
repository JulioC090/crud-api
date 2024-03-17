import Product from '@/entities/Product';

export type IAddProductServiceInput = Partial<Omit<Product, 'id'>>;

export type IAddProductServiceOutput = Promise<boolean>;

interface IAddProductService {
  execute(product: IAddProductServiceInput): IAddProductServiceOutput;
}

export default IAddProductService;

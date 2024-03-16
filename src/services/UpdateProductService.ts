import Product from '@/entities/Product';
import { IUpdateProductRepository } from '@/protocols/repositories/IUpdateProductRepository';

class UpdateProductService {
  private updateProductService: IUpdateProductRepository;

  constructor(updateProductService: IUpdateProductRepository) {
    this.updateProductService = updateProductService;
  }

  execute(id: string, partialProduct: Partial<Omit<Product, 'id'>>) {
    if (id.length < 1 || Object.keys(partialProduct).length === 0) return false;
    return this.updateProductService.update({ id, partialProduct });
  }
}

export default UpdateProductService;

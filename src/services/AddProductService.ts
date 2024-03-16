import Product from '@/entities/Product';
import { IAddProductRepository } from '@/protocols/repositories/IAddProductRepository';

class AddProductService {
  addProductRepository: IAddProductRepository;

  constructor(addProductRepository: IAddProductRepository) {
    this.addProductRepository = addProductRepository;
  }

  async execute(product: Product): Promise<boolean> {
    return await this.addProductRepository.add({ product });
  }
}

export default AddProductService;

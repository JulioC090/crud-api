import Product from '@/entities/Product';
import { IAddProductRepository } from '@/protocols/repositories/IAddProductRepository';
import IAddProductService from '@/protocols/services/IAddProductService';

class AddProductService implements IAddProductService {
  addProductRepository: IAddProductRepository;

  constructor(addProductRepository: IAddProductRepository) {
    this.addProductRepository = addProductRepository;
  }

  async execute(product: Partial<Omit<Product, 'id'>>): Promise<boolean> {
    return await this.addProductRepository.add({ product });
  }
}

export default AddProductService;

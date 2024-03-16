import Product from '@/entities/Product';
import { IListProductsRepository } from '@/protocols/repositories/IListProductsRepository';

class ListProductsService {
  private listProductsRepository: IListProductsRepository;

  constructor(listProductsRepository: IListProductsRepository) {
    this.listProductsRepository = listProductsRepository;
  }

  async execute(): Promise<Array<Product>> {
    return await this.listProductsRepository.list();
  }
}

export default ListProductsService;

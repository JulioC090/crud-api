import { IListProductsRepository } from '@/protocols/repositories/IListProductsRepository';
import IListProductsService, {
  IListProductsServiceOutput,
} from '@/protocols/services/IListProductsService';

class ListProductsService implements IListProductsService {
  private listProductsRepository: IListProductsRepository;

  constructor(listProductsRepository: IListProductsRepository) {
    this.listProductsRepository = listProductsRepository;
  }

  async execute(): IListProductsServiceOutput {
    return await this.listProductsRepository.list();
  }
}

export default ListProductsService;

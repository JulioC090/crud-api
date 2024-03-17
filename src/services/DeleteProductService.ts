import { IDeleteProductRepository } from '@/protocols/repositories/IDeleteProductRepository';
import IDeleteProductService, {
  IDeleteProductServiceInput,
  IDeleteProductServiceOutput,
} from '@/protocols/services/IDeleteProductService';

class DeleteProductService implements IDeleteProductService {
  private deleteProductRepository: IDeleteProductRepository;

  constructor(deleteProductRepository: IDeleteProductRepository) {
    this.deleteProductRepository = deleteProductRepository;
  }

  async execute(id: IDeleteProductServiceInput): IDeleteProductServiceOutput {
    if (id.length < 1) return false;
    return this.deleteProductRepository.delete({ id });
  }
}

export default DeleteProductService;

import { IDeleteProductRepository } from '@/protocols/repositories/IDeleteProductRepository';

class DeleteProductService {
  private deleteProductRepository: IDeleteProductRepository;

  constructor(deleteProductRepository: IDeleteProductRepository) {
    this.deleteProductRepository = deleteProductRepository;
  }

  async execute(id: string): Promise<boolean> {
    if (id.length < 1) return false;
    return this.deleteProductRepository.delete({ id });
  }
}

export default DeleteProductService;

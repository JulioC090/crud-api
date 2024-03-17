import { IUpdateProductRepository } from '@/protocols/repositories/IUpdateProductRepository';
import IUpdateProductService, {
  IUpdateProductServiceInput,
  IUpdateProductServiceOutput,
} from '@/protocols/services/IUpdateProductService';

class UpdateProductService implements IUpdateProductService {
  private updateProductService: IUpdateProductRepository;

  constructor(updateProductService: IUpdateProductRepository) {
    this.updateProductService = updateProductService;
  }

  async execute({
    id,
    partialProduct,
  }: IUpdateProductServiceInput): IUpdateProductServiceOutput {
    if (id.length < 1 || Object.keys(partialProduct).length === 0) return false;
    return this.updateProductService.update({ id, partialProduct });
  }
}

export default UpdateProductService;

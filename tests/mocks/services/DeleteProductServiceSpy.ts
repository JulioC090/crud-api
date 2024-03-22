import { IDeleteProductRepositoryOutput } from '@/protocols/repositories/IDeleteProductRepository';
import IDeleteProductService, {
  IDeleteProductServiceInput,
} from '@/protocols/services/IDeleteProductService';

class DeleteProductServiceSpy implements IDeleteProductService {
  params!: IDeleteProductServiceInput;
  result = true;

  async execute(
    params: IDeleteProductServiceInput,
  ): IDeleteProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

export default DeleteProductServiceSpy;

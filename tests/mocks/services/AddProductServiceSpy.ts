import { IAddProductRepositoryOutput } from '@/protocols/repositories/IAddProductRepository';
import IAddProductService, {
  IAddProductServiceInput,
} from '@/protocols/services/IAddProductService';

class AddProductServiceSpy implements IAddProductService {
  params!: IAddProductServiceInput;
  result = true;

  async execute(params: IAddProductServiceInput): IAddProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

export default AddProductServiceSpy;

import IUpdateProductService, {
  IUpdateProductServiceInput,
  IUpdateProductServiceOutput,
} from '@/protocols/services/IUpdateProductService';

class UpdateProductServiceSpy implements IUpdateProductService {
  params!: IUpdateProductServiceInput;
  result = true;

  async execute(
    params: IUpdateProductServiceInput,
  ): IUpdateProductServiceOutput {
    this.params = params;
    return this.result;
  }
}

export default UpdateProductServiceSpy;

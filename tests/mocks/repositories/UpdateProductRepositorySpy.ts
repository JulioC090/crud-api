import {
  IUpdateProductRepository,
  IUpdateProductRepositoryInput,
  IUpdateProductRepositoryOutput,
} from '@/protocols/repositories/IUpdateProductRepository';

class UpdateProductRepositorySpy implements IUpdateProductRepository {
  params!: IUpdateProductRepositoryInput;
  result = true;

  async update(
    params: IUpdateProductRepositoryInput,
  ): IUpdateProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

export default UpdateProductRepositorySpy;

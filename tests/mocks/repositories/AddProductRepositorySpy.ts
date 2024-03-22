import {
  IAddProductRepository,
  IAddProductRepositoryInput,
  IAddProductRepositoryOutput,
} from '@/protocols/repositories/IAddProductRepository';

class AddProductRepositorySpy implements IAddProductRepository {
  public params!: IAddProductRepositoryInput;
  public result = true;

  async add(data: IAddProductRepositoryInput): IAddProductRepositoryOutput {
    this.params = data;
    return this.result;
  }
}

export default AddProductRepositorySpy;

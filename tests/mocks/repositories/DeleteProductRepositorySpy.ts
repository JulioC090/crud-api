import {
  IDeleteProductRepository,
  IDeleteProductRepositoryInput,
  IDeleteProductRepositoryOutput,
} from '@/protocols/repositories/IDeleteProductRepository';

class DeleteProductRepositorySpy implements IDeleteProductRepository {
  params!: IDeleteProductRepositoryInput;
  result = true;

  async delete(
    params: IDeleteProductRepositoryInput,
  ): IDeleteProductRepositoryOutput {
    this.params = params;
    return this.result;
  }
}

export default DeleteProductRepositorySpy;

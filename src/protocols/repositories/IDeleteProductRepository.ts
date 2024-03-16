export type IDeleteProductRepositoryInput = {
  id: string;
};

export type IDeleteProductRepositoryOutput = Promise<boolean>;

export interface IDeleteProductRepository {
  delete(data: IDeleteProductRepositoryInput): IDeleteProductRepositoryOutput;
}

export type IDeleteProductServiceInput = string;

export type IDeleteProductServiceOutput = Promise<boolean>;

interface IDeleteProductService {
  execute(id: IDeleteProductServiceInput): IDeleteProductServiceOutput;
}

export default IDeleteProductService;

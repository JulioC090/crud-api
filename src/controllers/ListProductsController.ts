import { IHttpResponse } from '@/protocols/IHttp';
import IListProductsService from '@/protocols/services/IListProductsService';

class ListProductsController {
  private listProductsService: IListProductsService;

  constructor(listProductsService: IListProductsService) {
    this.listProductsService = listProductsService;
  }

  async handle(): Promise<IHttpResponse> {
    const response = await this.listProductsService.execute();
    return { status: 200, data: response };
  }
}

export default ListProductsController;

import { IHttpRequest, IHttpResponse } from '@/protocols/IHttp';
import IDeleteProductService from '@/protocols/services/IDeleteProductService';
import { z } from 'zod';

const requestParamsSchema = z.object({
  id: z.string().min(1),
});

class DeleteProductController {
  private deleteProductService: IDeleteProductService;

  constructor(deleteProductService: IDeleteProductService) {
    this.deleteProductService = deleteProductService;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const reqParams = requestParamsSchema.parse(request.params);

    const response = await this.deleteProductService.execute(reqParams.id);
    if (!response) return { status: 500 };

    return { status: 200 };
  }
}

export default DeleteProductController;

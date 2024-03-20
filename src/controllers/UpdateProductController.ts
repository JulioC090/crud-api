import { IHttpRequest, IHttpResponse } from '@/protocols/IHttp';
import IUpdateProductService from '@/protocols/services/IUpdateProductService';
import { z } from 'zod';

const requestParamsSchema = z.object({
  id: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
});

class UpdateProductController {
  private updateProductService: IUpdateProductService;

  constructor(updateProductService: IUpdateProductService) {
    this.updateProductService = updateProductService;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const reqParams = requestParamsSchema.parse(request.params);
    const reqBody = requestBodySchema.partial().parse(request.body);
    if (Object.keys(reqBody).length === 0) return { status: 400 };

    const response = await this.updateProductService.execute({
      id: reqParams.id,
      partialProduct: reqBody,
    });
    if (!response) return { status: 500 };

    return { status: 200 };
  }
}

export default UpdateProductController;

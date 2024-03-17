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
    const reqParams = requestParamsSchema.safeParse(request.params);
    if (!reqParams.success) return { status: 400 };

    const reqBody = requestBodySchema.partial().safeParse(request.body);
    if (!reqBody.success || Object.keys(reqBody.data).length === 0)
      return { status: 400 };

    const response = await this.updateProductService.execute({
      id: reqParams.data.id,
      partialProduct: reqBody.data,
    });
    if (!response) return { status: 500 };

    return { status: 200 };
  }
}

export default UpdateProductController;

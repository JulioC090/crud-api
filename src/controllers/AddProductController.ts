import { IHttpRequest, IHttpResponse } from '@/protocols/IHttp';
import IAddProductService from '@/protocols/services/IAddProductService';
import { z } from 'zod';

const requestBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
});

class AddProductController {
  private addProductService: IAddProductService;

  constructor(addProductService: IAddProductService) {
    this.addProductService = addProductService;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const req = requestBodySchema.parse(request.body);

    const response = await this.addProductService.execute(req);
    if (!response) return { status: 500 };

    return { status: 201 };
  }
}

export default AddProductController;

export interface IHttpRequest {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

export interface IHttpResponse {
  data?: unknown;
  status: number;
}

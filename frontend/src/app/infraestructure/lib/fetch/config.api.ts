import { z } from 'zod';
import { environment } from '../../config/environment';

export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type ApiMethod = (typeof API_METHOD)[keyof typeof API_METHOD];

export interface RouteDefinition<
  TResponse extends z.ZodType,
  TQuery extends z.ZodType | undefined = undefined
> {
  path: string;
  response: TResponse;
  query?: TQuery;
  isPaginated?: boolean;
}

export function parseRoute(path: string) {
  const [method, ...rest] = path.split(' ');
  if (!Object.values(API_METHOD).includes(method as ApiMethod)) {
    throw new Error(`Invalid HTTP method: ${method}`);
  }
  return {
    method: method as ApiMethod,
    path: rest.join(' '),
  };
}

export function createApiUrl(baseUrl: string = environment.API_BACK) {
  return function <T extends RouteDefinition<any, any>>(
    routePath: string,
    query?: z.infer<NonNullable<T['query']>>
  ): string {
    const { path } = parseRoute(routePath);
    const url = `${baseUrl}/${path}`;

    if (!query) return url;

    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });

    return `${url}?${params.toString()}`;
  };
}

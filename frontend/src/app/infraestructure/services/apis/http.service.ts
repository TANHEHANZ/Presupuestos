import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { z } from 'zod';
import {
  createApiUrl,
  parseRoute,
  RouteDefinition,
} from '../../lib/fetch/config.api';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private createUrl = createApiUrl();

  constructor(private http: HttpClient) {}
  request<T extends RouteDefinition<any, any>>(
    route: T,
    queryOrBody?: z.infer<NonNullable<T['query']>>
  ) {
    const { method, path } = parseRoute(route.path);
    const url = this.createUrl(
      route.path,
      method === 'GET' ? queryOrBody : undefined
    );

    return this.http
      .request<z.infer<T['response']>>(method.toUpperCase(), url, {
        body: method !== 'GET' ? queryOrBody : undefined,
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          const parsedResponse = route.response.parse(response.data);
          return parsedResponse;
        })
      );
  }
}

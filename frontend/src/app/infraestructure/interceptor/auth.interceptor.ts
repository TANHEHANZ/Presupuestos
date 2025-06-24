import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, catchError, throwError } from 'rxjs';
import { createApiUrl, parseRoute } from '../lib/fetch/config.api';
import { API_Login } from '../lib/fetch/modules.ts/api.login';

export const authInterceptorFn: HttpInterceptorFn = (() => {
  let refreshAttempts = 0;
  const MAX_REFRESH_ATTEMPTS = 3;

  return (req, next) => {
    const http = inject(HttpClient);
    const router = inject(Router);

    const authReq = req.clone({
      withCredentials: true,
    });

    const apiUrlBuilder = createApiUrl();

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (refreshAttempts < MAX_REFRESH_ATTEMPTS) {
            refreshAttempts++;

            const { method } = parseRoute(API_Login.refresh.path);
            const url = apiUrlBuilder(API_Login.refresh.path);

            return http.request(method, url, { withCredentials: true }).pipe(
              switchMap(() => {
                return next(authReq);
              }),
              catchError((err) => {
                if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
                  router.navigate(['/']);
                }
                return throwError(() => err);
              })
            );
          } else {
            // Ya superamos el máximo de intentos
            router.navigate(['/']);
            return throwError(() => error);
          }
        }

        // Si no es un 401, lanza el error normalmente (no redirige)
        return throwError(() => error);
      })
    );
  };
})();

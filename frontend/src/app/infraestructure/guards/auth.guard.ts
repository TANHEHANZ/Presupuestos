import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}
  canActivate() {
    return this.http.get('/api/auth/validate', { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

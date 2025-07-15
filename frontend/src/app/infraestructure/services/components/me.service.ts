import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../config/environment';

interface NavItem {
  label: string;
  icon: string;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface DecodedToken {
  _u: {
    name: string;
    rol: string;
    unidad: string;
  };
  _p: string[];
  _n: NavGroup[];
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class MeService {
  private tokenKey = '_u';
  private decodedToken?: DecodedToken;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  private loadToken() {
    const raw = sessionStorage.getItem(this.tokenKey);
    if (raw) {
      try {
        this.decodedToken = jwtDecode<DecodedToken>(raw);
      } catch (err) {
        console.error('Token inválido', err);
      }
    }
  }
  public setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
    this.decodedToken = jwtDecode<DecodedToken>(token);
  }

  public get user() {
    return this.decodedToken?._u;
  }

  public get permissions(): string[] {
    return this.decodedToken?._p || [];
  }

  public get navigation(): NavGroup[] {
    return this.decodedToken?._n || [];
  }

  public get isTokenExpired(): boolean {
    if (!this.decodedToken) return true;
    const now = Math.floor(Date.now() / 1000);
    return this.decodedToken.exp < now;
  }
  public getToken() {
    return sessionStorage.getItem('_u');
  }
  public validateTokenBackend(): Observable<boolean> {
    const token = this.getToken();
    if (!token) return new Observable((observer) => observer.next(false));

    const headers = new HttpHeaders({ 'X-token': token });

    return new Observable((observer) => {
      this.http
        .get<{ status: number; data: boolean }>(
          `${environment.API_BACK}/v1/api/configuration/me/valid`,
          { headers }
        )
        .subscribe({
          next: (res: any) => observer.next(res.data),
          error: () => observer.next(false),
        });
    });
  }

  public clearSession() {
    sessionStorage.removeItem(this.tokenKey);
    this.decodedToken = undefined;
  }
}

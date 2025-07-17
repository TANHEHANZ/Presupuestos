import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Login } from '../../lib/fetch/modules.ts/api.login';
import { DTO_lnLogin } from '../../models/login/m_login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private s_http = inject(HttpService);
  login(credentials: DTO_lnLogin) {
    return this.s_http.request(API_Login.start, credentials);
  }
  logaut() {
    return this.s_http.request(API_Login.logout);
  }
  me() {
    return this.s_http.request(API_Login.me);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DTO_UserValid } from '../../models/user/m_valid';
import { API_User } from '../../lib/fetch/modules.ts/api.user';
import { DTO_UserCreate } from '../../models/user/m_create';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private s_http = inject(HttpService);
  valid(credentials: DTO_UserValid) {
    return this.s_http.request(API_User.valid, credentials);
  }
  create(data: DTO_UserCreate) {
    return this.s_http.request(API_User.create, data);
  }
}

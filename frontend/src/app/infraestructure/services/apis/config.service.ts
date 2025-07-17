import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Configuration } from '../../lib/fetch/modules.ts/api.config';
import { DTO_uChangePassword } from '../../models/config/m_changePassword';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private s_http = inject(HttpService);
  permitionsAll() {
    return this.s_http.request(API_Configuration.all);
  }
  profile() {
    return this.s_http.request(API_Configuration.profile);
  }
  changePassword(params: DTO_uChangePassword) {
    return this.s_http.request(API_Configuration.changePassword, params);
  }
}

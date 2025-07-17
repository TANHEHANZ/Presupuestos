import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Configuration } from '../../lib/fetch/modules.ts/api.config';

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
  changePassword(currentPassword: string, newPassword: string) {
    return this.s_http.request(API_Configuration.profile);
  }
}

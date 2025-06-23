import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Unidades } from '../../lib/fetch/modules.ts/api.unidades';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  private s_http = inject(HttpService);
  all() {
    return this.s_http.request(API_Unidades.all);
  }
}

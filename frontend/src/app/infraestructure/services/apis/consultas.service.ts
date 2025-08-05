import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DTO_consultaQuery } from '../../models/consultas/m_query';
import { API_Consultas } from '../../lib/fetch/modules.ts/api.consultas';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  private s_http = inject(HttpService);
  filter(params?: DTO_consultaQuery) {
    return this.s_http.request(API_Consultas.filter, params);
  }
  DA() {
    return this.s_http.request(API_Consultas.DA);
  }
}

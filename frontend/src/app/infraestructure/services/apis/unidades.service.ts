import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Unidades } from '../../lib/fetch/modules.ts/api.unidades';
import { DTO_FilterUnidad } from '../../models/unidades/m_unidades';
import { DTO_CreateUnidad } from '../../models/unidades/m_ucreate';
import { DTO_UpdateUnidad } from '../../models/unidades/m_uupdate';
import { DTO_UnidadDeleted } from '../../models/unidades/m_delete';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  private s_http = inject(HttpService);
  all(filter?: DTO_FilterUnidad) {
    return this.s_http.request(API_Unidades.all, filter);
  }
  craate(data: DTO_CreateUnidad) {
    return this.s_http.request(API_Unidades.create, data);
  }
  update(data: DTO_UpdateUnidad) {
    return this.s_http.request(API_Unidades.update, data);
  }
  deleted(id: DTO_UnidadDeleted) {
    return this.s_http.request(API_Unidades.deleted, id);
  }
}

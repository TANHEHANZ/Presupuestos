import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_PresupuestoUni } from '../../lib/fetch/modules.ts/api.presupuestoUni';
import { DTO_FilterPresupuestoUnidad } from '../../models/presupuestos/unidad/m_filters';
import {
  DTO_presupuestoUniUpload,
  DTO_presupuestoUniUploadR,
} from '../../models/presupuestos/unidad/m_upload';
@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private s_http = inject(HttpService);
  list(filter?: DTO_FilterPresupuestoUnidad) {
    return this.s_http.request(API_PresupuestoUni.list, filter);
  }
  upload(file: DTO_presupuestoUniUpload) {
    return this.s_http.request(API_PresupuestoUni.upload, file);
  }
}

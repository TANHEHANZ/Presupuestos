import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DTO_FilterProyecto } from '../../models/presupuestos/proyectos/m_filter';
import { API_Proyectos } from '../../lib/fetch/modules.ts/api.proyecto';
@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private s_http = inject(HttpService);
  list(filter: DTO_FilterProyecto) {
    return this.s_http.request(API_Proyectos.all, filter);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_Proyectos } from '../../lib/fetch/modules.ts/api.proyecto';
import { DTO_Filter } from '../../models/programation/m_filter';
import { API_Programation } from '../../lib/fetch/modules.ts/api.programation';
import { DTO_ProgramationCreate } from '../../models/programation/m_programation';
@Injectable({
  providedIn: 'root',
})
export class ProgramationService {
  private s_http = inject(HttpService);
  list(filter: DTO_Filter) {
    return this.s_http.request(API_Programation.all, filter);
  }
  crate(data: DTO_ProgramationCreate) {
    return this.s_http.request(API_Programation.create, data);
  }
}

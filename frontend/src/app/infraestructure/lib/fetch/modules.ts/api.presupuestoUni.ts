import {
  M_filtersPresupuesto,
  M_presupuestoUnidadesR,
} from '../../../models/presupuestos';
import { ItemsRCalendar } from '../../../models/presupuestos/filters/m_calendar';
import {
  M_presupuestoUniUpload,
  M_presupuestoUniUploadR,
} from '../../../models/presupuestos/unidad/m_upload';
import { RouteDefinition } from '../config.api';

export const API_PresupuestoUni = {
  list: {
    path: 'GET v1/api/presupuesto/unidad',
    response: M_presupuestoUnidadesR,
    query: M_filtersPresupuesto,
    isPaginated: false,
  },
  upload: {
    path: 'POST v1/api/presupuesto/unidad/upload-xlsx',
    response: M_presupuestoUniUploadR,
    query: M_presupuestoUniUpload,
    isPaginated: false,
  },
  calendar: {
    path: 'GET v1/api/presupuesto/calendar',
    response: ItemsRCalendar,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

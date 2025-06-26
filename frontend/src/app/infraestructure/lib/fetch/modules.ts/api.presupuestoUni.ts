import {
  M_filtersPresupuesto,
  M_presupuestoUnidadesR,
} from '../../../models/presupuestos';
import { RouteDefinition } from '../config.api';

export const API_PresupuestoUni = {
  list: {
    path: 'GET v1/api/presupuesto/unidad',
    response: M_presupuestoUnidadesR,
    query: M_filtersPresupuesto,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

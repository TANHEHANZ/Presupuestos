import { M_uniAll } from '../../../models/unidades/m_unidades';
import { RouteDefinition } from '../config.api';

export const API_Unidades = {
  all: {
    path: 'GET v1/api/unidad',
    response: M_uniAll,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

import { M_proyectosR } from '../../../models/presupuestos/proyectos/m_proyectos';
import { RouteDefinition } from '../config.api';

export const API_Proyectos = {
  all: {
    path: 'GET v1/api/presupuesto/proyecto',
    response: M_proyectosR,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

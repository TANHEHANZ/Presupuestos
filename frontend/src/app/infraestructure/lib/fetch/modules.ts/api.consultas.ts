import { dataSchema } from '../../../models/consultas/m_consultas';
import { DAFilterResponse } from '../../../models/consultas/m_da';
import { consultaQuery } from '../../../models/consultas/m_query';
import { RouteDefinition } from '../config.api';

export const API_Consultas = {
  filter: {
    path: 'GET v1/api/consultas/',
    response: dataSchema,
    query: consultaQuery,
    isPaginated: false,
  },
  DA: {
    path: 'GET v1/api/consultas/DA',
    response: DAFilterResponse,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

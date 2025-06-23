
import { LoginChema } from '../../../models/login/m_login';
import { RouteDefinition } from '../config.api';

export const API_Configuration = {
  start: {
    path: 'POST v1/api/configuration/permition',
    response: ,
    query: LoginChema,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

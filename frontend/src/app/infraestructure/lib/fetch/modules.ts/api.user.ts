import { RouteDefinition } from '../config.api';
import { M_uValid, M_uValidR } from '../../../models/user/m_valid';

export const API_User = {
  valid: {
    path: 'POST v1/api/user/valid',
    response: M_uValidR,
    query: M_uValid,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

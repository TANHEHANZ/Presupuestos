import { RouteDefinition } from '../config.api';
import { M_uValid, M_uValidR } from '../../../models/user/m_valid';
import { M_uCreate } from '../../../models/user/m_create';
import { z } from 'zod';
import { M_uList } from '../../../models/user/m_list';
const AnyResponse = z.any();
export const API_User = {
  valid: {
    path: 'POST v1/api/user/valid',
    response: M_uValidR,
    query: M_uValid,
    isPaginated: false,
  },
  all: {
    path: 'GET v1/api/user',
    isPaginated: false,
    response: M_uList,
  },
  create: {
    path: 'POST v1/api/user',
    isPaginated: false,
    query: M_uCreate,
    response: AnyResponse,
  },
  edit: {
    path: 'PUT v1/api/user',
    isPaginated: false,
    query: M_uCreate,
    response: AnyResponse,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

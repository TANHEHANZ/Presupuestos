import { z } from 'zod';
import { LoginChema, LoginResponse } from '../../../models/login/m_login';
import { RouteDefinition } from '../config.api';
const AnyResponse = z.any();
export const API_Login = {
  start: {
    path: 'POST v1/api/login',
    response: AnyResponse,
    query: LoginChema,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

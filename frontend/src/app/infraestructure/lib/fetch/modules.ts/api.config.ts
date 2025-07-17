import { z } from 'zod';
import { changePasswordParams } from '../../../models/config/m_changePassword';
import { M_uProfile } from '../../../models/config/m_profile';
import { PermitionsR } from '../../../models/permitions/m_permitions';
import { RouteDefinition } from '../config.api';

export const API_Configuration = {
  all: {
    path: 'GET v1/api/configuration/permition',
    response: PermitionsR,
    isPaginated: false,
  },
  profile: {
    path: 'GET v1/api/configuration/profile',
    response: M_uProfile,
    isPaginated: false,
  },
  changePassword: {
    path: 'POST v1/api/user/change-pass',
    query: changePasswordParams,
    response: z.any(),
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

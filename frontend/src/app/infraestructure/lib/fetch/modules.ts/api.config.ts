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
} satisfies Record<string, RouteDefinition<any, any>>;

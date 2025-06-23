import { PermitionsR } from '../../../models/permitions/m_permitions';
import { RouteDefinition } from '../config.api';

export const API_Configuration = {
  all: {
    path: 'GET v1/api/configuration/permition',
    response: PermitionsR,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

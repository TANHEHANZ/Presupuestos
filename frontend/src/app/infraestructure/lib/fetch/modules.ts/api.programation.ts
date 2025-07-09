import { z } from 'zod';
import {
  createProgramation,
  M_programation,
} from '../../../models/programation/m_programation';
import { RouteDefinition } from '../config.api';

export const API_Programation = {
  all: {
    path: 'GET v1/api/programacion',
    response: M_programation,
    isPaginated: false,
  },
  create: {
    path: 'POST v1/api/programacion',
    response: z.any(),
    query: createProgramation,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

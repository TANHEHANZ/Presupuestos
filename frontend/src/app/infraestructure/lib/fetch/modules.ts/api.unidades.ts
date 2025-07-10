import { z } from 'zod';
import { CreateUnidadSchema } from '../../../models/unidades/m_ucreate';
import {
  M_filterUnidad,
  M_uniAll,
  M_uniAllPaginated,
} from '../../../models/unidades/m_unidades';
import { RouteDefinition } from '../config.api';
import { UpdateUnidadSchema } from '../../../models/unidades/m_uupdate';
import { M_unidadDeleted } from '../../../models/unidades/m_delete';

export const API_Unidades = {
  all: {
    path: 'GET v1/api/unidad',
    response: M_uniAllPaginated,
    query: M_filterUnidad,
    isPaginated: false,
  },
  create: {
    path: 'POST v1/api/unidad',
    response: z.any(),
    query: CreateUnidadSchema,
    isPaginated: false,
  },
  update: {
    path: 'PUT v1/api/unidad',
    response: z.any(),
    query: UpdateUnidadSchema,
    isPaginated: false,
  },
  deleted: {
    path: 'DELETE v1/api/unidad',
    response: z.any(),
    query: M_unidadDeleted,
    isPaginated: false,
  },
} satisfies Record<string, RouteDefinition<any, any>>;

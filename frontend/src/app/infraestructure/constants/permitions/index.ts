import { P_configuration } from './p_configuration';
import { P_consultas } from './p_consultas';
import { P_dashboard } from './p_dashboard';
import { P_config } from './p_permisos';
import { P_preUnidad } from './p_preUnidad';
import { P_programation } from './p_programation';
import { P_report } from './p_report';
import { P_unit } from './p_unidades';
import { P_user } from './p_user';

export const PERMISSION_KEYS = [
  ...Object.values(P_user),
  ...Object.values(P_unit),
  ...Object.values(P_preUnidad),
  ...Object.values(P_report),
  ...Object.values(P_consultas),
  ...Object.values(P_config),
  ...Object.values(P_programation),
  ...Object.values(P_dashboard),
  ...Object.values(P_configuration),
  'ALL',
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];

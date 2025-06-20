import { PERMISSION } from "@/infraestructure/constants";
import { PERMITION_KEYS } from "@/infraestructure/constants/permitions";

export const P_service = {
  all: async () => {
    return PERMISSION;
  },
  key: async () => {
    return Object.fromEntries(
      Object.entries(PERMITION_KEYS).map(([group, permisos]) => [
        group,
        permisos.map((permiso) => permiso.key),
      ])
    );
  },
};

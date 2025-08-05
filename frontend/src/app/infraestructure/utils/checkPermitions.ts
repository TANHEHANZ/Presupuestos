import { PermissionKey } from '../constants/permitions';

export function hasPermissions(
  permissionsToCheck: PermissionKey[],
  userPermissions: any[]
): Record<PermissionKey, boolean> {
  const result: Record<PermissionKey, boolean> = {} as any;

  for (const permission of permissionsToCheck) {
    result[permission] =
      userPermissions.includes('ALL') || userPermissions.includes(permission);
  }

  return result;
}

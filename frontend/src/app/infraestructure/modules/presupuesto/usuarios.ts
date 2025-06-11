import { R_UserDTO } from './types';

export const D_User: R_UserDTO[] = [
  {
    ci: '12345678',
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    rol: 'admin',
    estado: 'activo',
    createdAt: '2024-06-11T12:00:00Z',
    permisos: [
      { id: 'perm-1', nombre: 'GESTION_USUARIOS' },
      { id: 'perm-2', nombre: 'EJECUCION_PRESUPUESTO' },
    ],
  },
  {
    ci: '87654321',
    name: 'Ana Gómez',
    email: 'ana.gomez@email.com',
    rol: 'user',
    estado: 'activo',
    createdAt: '2024-06-10T09:30:00Z',
    permisos: [{ id: 'perm-3', nombre: 'CONSULTA_PRESUPUESTO' }],
  },
];

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NavGuard } from '../../../infraestructure/guards/nav.guard';

export const PRESUPUSTO_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        canActivate: [NavGuard],

        loadComponent: () =>
          import('./usuaros/user.component').then((c) => c.UserComponent),
      },
      {
        path: 'consultas',
        canActivate: [NavGuard],

        loadComponent: () =>
          import('./consultas/consultas.component').then(
            (c) => c.ConsultasComponent
          ),
      },
      {
        path: 'presupestar',
        canActivate: [NavGuard],

        loadComponent: () =>
          import('./presupuestar/presupuestar.component').then(
            (c) => c.PresupuestarComponent
          ),
      },

      {
        path: 'unidades',
        canActivate: [NavGuard],

        loadComponent: () =>
          import('./unidades/unidades.component').then(
            (c) => c.UnidadesComponent
          ),
      },
      {
        path: 'configuration',
        canActivate: [NavGuard],

        children: [
          {
            path: '',
            loadComponent: () =>
              import('./configurations/config.component').then(
                (c) => c.ConfigComponent
              ),
          },
          {
            path: 'perfil',
            canActivate: [NavGuard],

            loadComponent: () =>
              import('./configurations/perfil/perfil.component').then(
                (c) => c.PerfilComponent
              ),
          },
        ],
      },

      {
        path: 'programacion',
        canActivate: [NavGuard],

        loadComponent: () =>
          import('./programacion/programacion.component').then(
            (c) => c.ProgramacionComponent
          ),
      },
      {
        path: '',
        canActivate: [NavGuard],
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
    ],
  },
];

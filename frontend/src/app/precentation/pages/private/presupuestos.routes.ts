import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const PRESUPUSTO_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import('./usuaros/user.component').then((c) => c.UserComponent),
      },
      {
        path: 'consultas',
        loadComponent: () =>
          import('./consultas/consultas.component').then(
            (c) => c.ConsultasComponent
          ),
      },
      {
        path: 'presupestar',
        loadComponent: () =>
          import('./presupuestar/presupuestar.component').then(
            (c) => c.PresupuestarComponent
          ),
      },

      {
        path: 'unidades',
        loadComponent: () =>
          import('./unidades/unidades.component').then(
            (c) => c.UnidadesComponent
          ),
      },

      {
        path: 'programacion',
        loadComponent: () =>
          import('./programacion/programacion.component').then(
            (c) => c.ProgramacionComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
    ],
  },
];

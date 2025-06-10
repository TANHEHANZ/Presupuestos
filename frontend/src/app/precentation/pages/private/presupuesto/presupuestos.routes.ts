import { Routes } from '@angular/router';
import { PresupuestoLayoutComponent } from '../presupuesto/layout.component';

export const PRESUPUSTO_ROUTES: Routes = [
  {
    path: '',
    component: PresupuestoLayoutComponent,
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
        path: 'unidades',
        loadComponent: () =>
          import('./unidades/unidades.component').then(
            (c) => c.UnidadesComponent
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

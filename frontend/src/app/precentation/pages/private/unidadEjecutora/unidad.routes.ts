import { Routes } from '@angular/router';
import { UnidadLayoutComponent } from './layout.component';

export const UNIDAD_ROUTES: Routes = [
  {
    path: '',
    component: UnidadLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashborad/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'registros',
        loadComponent: () =>
          import('./registros/registros.component').then(
            (c) => c.RegiostrosComponent
          ),
      },
    ],
  },
];

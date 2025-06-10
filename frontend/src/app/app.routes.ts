import { Routes } from '@angular/router';
import { LoginComponent } from './precentation/pages/public/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'unidad_ejecutora',
        loadChildren: () =>
          import(
            './precentation/pages/private/unidadEjecutora/unidad.routes'
          ).then((m) => m.UNIDAD_ROUTES),
      },
      {
        path: 'presupuestos',
        loadChildren: () =>
          import(
            './precentation/pages/private/presupuesto/presupuestos.routes'
          ).then((m) => m.PRESUPUSTO_ROUTES),
      },
    ],
  },
];

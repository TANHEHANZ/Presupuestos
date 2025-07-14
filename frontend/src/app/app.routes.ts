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
        path: '',
        loadChildren: () =>
          import('./precentation/pages/private/presupuestos.routes').then(
            (m) => m.PRESUPUSTO_ROUTES
          ),
      },
    ],
  },
];

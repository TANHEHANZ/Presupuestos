import { Routes } from '@angular/router';
import { PresupuestoLayoutComponent } from '../presupuesto/layout.component';

export const PRESUPUSTO_ROUTES: Routes = [
  {
    path: '',
    component: PresupuestoLayoutComponent,
    children: [{}],
  },
];

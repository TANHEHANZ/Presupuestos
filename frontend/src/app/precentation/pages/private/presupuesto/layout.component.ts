import { Component } from '@angular/core';
import { NavComponent } from '../../../shared/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ToastComponent } from '../../../../infraestructure/lib/toast/toast.component';

@Component({
  selector: 'app-presupuesto-layout',
  template: `
    <app-toast />
    <main class="grid grid-cols-[130px_1fr] h-screen">
      <app-nav class="h-full"></app-nav>
      <div class="bg-slate-200 h-full">
        <header
          class="flex justify-between items-center p-4 bg-white shadow h-24"
        ></header>
        <div class=" p-8">
          <router-outlet />
        </div>
      </div>
    </main>
  `,
  imports: [NavComponent, RouterOutlet, ModalComponent, ToastComponent],
})
export class PresupuestoLayoutComponent {}

import { Component, inject, OnInit } from '@angular/core';
import { MeService } from '../../../infraestructure/services/components/me.service';
import { CustomButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  template: ` <header
    class="flex  justify-between items-center p-4 bg-white shadow h-24"
  >
    <div class="flex flex-col">
      <p
        class=" text-[10px] px-4 py-0.5 bg-primary self-start rounded-md text-white"
      >
        {{ infoUser.rol }}
      </p>
      <p>{{ infoUser.name }}</p>
      <p class="text-xs text-gray-500">{{ infoUser.unidad }}</p>
    </div>
    <app-custom-button
      [variant]="'secondary'"
      [icon]="'logout'"
      (btnClick)="logout()"
      >Cerrar secion</app-custom-button
    >
  </header>`,
  imports: [CustomButtonComponent],
})
export class HeaderComponent implements OnInit {
  meS = inject(MeService);
  router = inject(Router);
  infoUser: { name: string; rol: string; unidad: string } = {
    name: '',
    rol: '',
    unidad: '',
  };
  ngOnInit(): void {
    this.infoUser = this.meS.user!;
  }
  logout() {
    this.meS.cerrarSesion();
    this.router.navigate(['/']);
  }
}

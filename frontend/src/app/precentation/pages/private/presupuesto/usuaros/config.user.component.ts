import { Component, OnInit, input } from '@angular/core';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { permitions } from '../../../../../infraestructure/modules/permition/permitions';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { PermitionViewerComponent } from '../../../../../infraestructure/modules/permition/render.permition';

@Component({
  selector: 'app-config-user-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent,
    IconComponent,
    PermitionViewerComponent,
  ],
  template: `
    <div class="flex flex-col justify-between h-[80dvh]">
      <form [formGroup]="userForm" class="grid grid-cols-2">
        <p class="col-span-full font-medium">Informacion del usuario</p>
        <app-custom-input label="CI" formControlName="ci" [disabled]="true" />
        <app-custom-input label="Nombre" formControlName="name" />
        <app-custom-input label="Email" formControlName="email" />
        <app-custom-input label="Rol" formControlName="rol" />
        <app-custom-input label="Estado" formControlName="estado" />
      </form>
      <section class=" rounded-lg max-h-96 overflow-y-auto relative border p-4">
        <p class="col-span-full font-medium  ">Asignar permisos</p>

        <app-permition-viewer
          [permitions]="D_permisos"
          (selectedChange)="selectedPermitions = $event"
        ></app-permition-viewer>
      </section>
      <section class="flex gap-4 flex-wrap col-span-2 justify-end">
        <app-custom-button [icon]="'save'">guardar</app-custom-button>
        <app-custom-button [variant]="'danger'" [icon]="'close'">
          Cancelar
        </app-custom-button>
      </section>
    </div>
  `,
})
export class ConfigUserComponent implements OnInit {
  D_user = input<R_UserDTO>();
  D_permisos = permitions;
  userForm!: FormGroup;
  selectedPermitions: string[] = [];

  ngOnInit() {
    const user = this.D_user();
    this.userForm = new FormGroup({
      ci: new FormControl({ value: user?.ci ?? '', disabled: true }),
      name: new FormControl({ value: user?.name ?? '', disabled: true }),
      email: new FormControl({ value: user?.email ?? '', disabled: true }),
      rol: new FormControl({ value: user?.rol ?? '', disabled: true }),
      estado: new FormControl({ value: user?.estado ?? '', disabled: true }),
      createdAt: new FormControl(user?.createdAt ?? ''),
    });
  }

  onPermitionToggle(key: string, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const checked = input.checked;
    if (checked) {
      this.selectedPermitions = [...this.selectedPermitions, key];
    } else {
      this.selectedPermitions = this.selectedPermitions.filter(
        (k) => k !== key
      );
    }
  }

  getPermClass(permiso: { color: string; key: string }) {
    return this.selectedPermitions.includes(permiso.key)
      ? permiso.color + ' border-2'
      : 'bg-white text-gray-700';
  }
}

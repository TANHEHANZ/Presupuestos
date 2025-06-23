import { Component, OnInit, inject, input } from '@angular/core';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { permitions } from '../../../../../infraestructure/modules/permition/permitions';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { PermitionViewerComponent } from '../../../../../infraestructure/modules/permition/render.permition';
import { DTO_UserValidR } from '../../../../../infraestructure/models/user/m_valid';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { UnidadesService } from '../../../../../infraestructure/services/apis/unidades.service';
import { DTO_UnidadesR } from '../../../../../infraestructure/models/unidades/m_unidades';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';

@Component({
  selector: 'app-config-user-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    CustomButtonComponent,
    PermitionViewerComponent,
    CustomSelectComponent,
  ],
  template: `
    <div class="flex flex-col gap-4 h-[80dvh] w-[50dvw]">
      <form
        [formGroup]="userForm"
        class="grid grid-cols-2 gap-2 "
        (ngSubmit)="createUser()"
      >
        <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-4">
          <p class="col-span-full font-medium">Informacion del usuario</p>
          <app-custom-input label="CI" formControlName="ci" />
          <app-custom-input label="Nombre" formControlName="name" />
          <app-custom-select
            label="Unidades"
            id="unidades-select"
            [items]="valueUnidaes"
            formControlName="unidad"
          >
          </app-custom-select>
          <app-custom-select
            label="Tipo usuario"
            id="rol-select"
            [items]="[
              { label: 'Operador', value: 'OPERADOR' },
              { label: 'Administrador', value: 'ADMIN' },
              { label: 'Presupuestos', value: 'PRESUPUESTOS' }
            ]"
            formControlName="rol"
          >
          </app-custom-select>
          <app-custom-select
            label="Estado"
            id="estado-select"
            [items]="[
              { label: 'Activo', value: 'ACTIVO' },
              { label: 'Inactivo', value: 'INACTIVO' }
            ]"
            formControlName="estado"
          >
          </app-custom-select>
        </div>
        <section class=" rounded-lg flex-1 overflow-y-auto relative border p-4">
          <p class="col-span-full font-medium  ">Asignar permisos</p>

          <app-permition-viewer
            [permitions]="D_permisos"
            (selectedChange)="selectedPermitions = $event"
          ></app-permition-viewer>
        </section>
        <section class="flex gap-4 flex-wrap col-span-2 justify-end mt-4">
          <app-custom-button [icon]="'save'" [type]="'submit'"
            >guardar</app-custom-button
          >
          <app-custom-button [variant]="'danger'" [icon]="'close'">
            Cancelar
          </app-custom-button>
        </section>
      </form>
    </div>
  `,
})
export class ConfigUserComponent implements OnInit {
  unidadesS = inject(UnidadesService);
  toastS = inject(ToastService);

  D_user = input<DTO_UserValidR>();
  D_permisos = permitions;
  userForm = new FormGroup({
    ci: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    unidad: new FormControl('', { nonNullable: true }),
    permisos: new FormControl('', { nonNullable: true }),
    rol: new FormControl('', { nonNullable: true }),
    estado: new FormControl('', { nonNullable: true }),
  });

  selectedPermitions: string[] = [];
  valueUnidaes: { label: string; value: string }[] = [];
  ngOnInit() {
    const user = this.D_user();
    if (user) {
      this.userForm.patchValue({
        ci: user.ci ?? '',
        name: user.name ?? '',
      });
    }
    this.loadUnidades();
  }

  loadUnidades() {
    this.unidadesS.all().subscribe({
      next: (value) => {
        console.log('Datos de unidades:', value);
        this.valueUnidaes = this.mapUnidades(value);
      },
      error: (e) => {
        console.error('Error al cargar unidades:', e);
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'unidades-error',
          type: 'error',
        });
      },
    });
  }
  loadPermisos() {
    this.unidadesS.all().subscribe({
      next: (value) => {
        console.log('Datos de unidades:', value);
        this.valueUnidaes = this.mapUnidades(value);
      },
      error: (e) => {
        console.error('Error al cargar unidades:', e);
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'unidades-error',
          type: 'error',
        });
      },
    });
  }

  mapUnidades(unidades: DTO_UnidadesR): { label: string; value: string }[] {
    return unidades.map((unidad) => ({
      label: `${unidad.ue} - ${unidad.secretaria}`,
      value: unidad.id,
    }));
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

  createUser() {
    console.log(this.userForm.getRawValue());
  }
}

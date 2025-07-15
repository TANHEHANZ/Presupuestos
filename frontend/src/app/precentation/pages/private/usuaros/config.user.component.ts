import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { PermitionViewerComponent } from '../../../../infraestructure/modules/permition/render.permition';
import { DTO_UserValidR } from '../../../../infraestructure/models/user/m_valid';
import { CustomSelectComponent } from '../../../shared/select/select.component';
import { UnidadesService } from '../../../../infraestructure/services/apis/unidades.service';
import { DTO_UnidadesR } from '../../../../infraestructure/models/unidades/m_unidades';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { ConfigService } from '../../../../infraestructure/services/apis/config.service';
import { DTO_pPermitionsR } from '../../../../infraestructure/models/permitions/m_permitions';
import { UserService } from '../../../../infraestructure/services/apis/user.service';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';

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
        (ngSubmit)="saveUser()"
      >
        <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-4">
          <p class="col-span-full font-medium">Informacion del usuario</p>
          <app-custom-input label="CI" formControlName="ci" />
          <app-custom-input label="Nombre" formControlName="name" />
          <app-custom-select
            label="Unidades"
            id="unidades-select"
            [items]="valueUnidaes"
            formControlName="unidadId"
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
        <section
          class=" rounded-lg flex-1 overflow-y-auto max-h-[70dvh] relative border p-4"
        >
          <p class="col-span-full font-medium  ">Asignar permisos</p>

          <app-permition-viewer
            [permitions]="D_permisos"
            [initialSelected]="selectedPermitions"
            (selectedChange)="selectedPermitions = $event"
          ></app-permition-viewer>
        </section>
        <section class="flex gap-4 flex-wrap col-span-2 justify-end mt-4">
          <app-custom-button
            [icon]="edit ? 'edit' : 'save'"
            [type]="'submit'"
            >{{ edit ? 'editar' : 'Guardar' }}</app-custom-button
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
  @Output() userCreated = new EventEmitter<void>();
  @Input() edit = false;

  unidadesS = inject(UnidadesService);
  toastS = inject(ToastService);
  userS = inject(UserService);
  permitionsS = inject(ConfigService);
  drawerS = inject(PanelService);
  D_user = input<any>();
  D_permisos: DTO_pPermitionsR | [] = [];
  userForm = new FormGroup({
    ci: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    unidadId: new FormControl('', { nonNullable: true }),
    permisos: new FormControl('', { nonNullable: true }),
    rol: new FormControl('', { nonNullable: true }),
    estado: new FormControl('', { nonNullable: true }),
  });
  selectedPermitions: string[] = [];
  valueUnidaes: { label: string; value: string }[] = [];
  ngOnInit() {
    const user = this.D_user() as any;
    if (user) {
      this.userForm.patchValue({
        ci: user.ci ?? '',
        name: user.name ?? '',
        unidadId: user.unidadEjecutora?.id ?? '',
        rol: user.rol ?? '',
        estado: user.estado ?? '',
      });

      this.selectedPermitions = user.permisos
        ? user.permisos.flatMap((group: any) =>
            group.permissions.map((p: any) => p.key)
          )
        : [];
    }
    if (this.edit) {
      console.log('edicion', user);
      this.userForm.get('ci')?.disable();
      this.userForm.get('name')?.disable();
    }

    this.loadUnidades();
    this.loadPermisos();
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
    this.permitionsS.permitionsAll().subscribe({
      next: (value) => {
        this.D_permisos = value;
      },
      error: (e) => {
        console.error('Error al cargar permisos:', e);
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'permisos-error',
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

  saveUser() {
    const formData = this.userForm.getRawValue();
    const payload = {
      ci: formData.ci ?? '',
      name: formData.name ?? '',
      unidadId: formData.unidadId,
      permisos: this.selectedPermitions,
      rol: formData.rol,
      estado: formData.estado,
      idUser: this.D_user().id,
    };

    const request$ = this.edit
      ? this.userS.update(payload)
      : this.userS.create(payload);

    request$.subscribe({
      next: (value) => {
        console.log(value);
        this.userCreated.emit();
        this.drawerS.closeDrawer(true);
      },
      error: (e) => {
        console.log(e);
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'user-save-error',
          type: 'error',
        });
      },
    });
  }
}

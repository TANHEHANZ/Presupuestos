import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { PermitionViewerComponent } from '../../../../infraestructure/modules/permition/render.permition';
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
        class="grid grid-cols-2 gap-2"
        (ngSubmit)="saveUser()"
      >
        <div class="p-4 border border-gray-200 rounded-lg flex flex-col gap-4">
          <p class="col-span-full font-medium">Información del usuario</p>

          <app-custom-input label="CI" formControlName="ci" />
          <app-custom-input label="Nombre" formControlName="name" />

          <app-custom-select
            label="Unidades"
            id="unidades-select"
            [items]="valueUnidaes"
            formControlName="unidadId"
          />

          <app-custom-select
            label="Tipo usuario"
            id="rol-select"
            [items]="[
              { label: 'Operador', value: 'OPERADOR' },
              { label: 'Administrador', value: 'ADMIN' },
              { label: 'Presupuestos', value: 'PRESUPUESTOS' }
            ]"
            formControlName="rol"
          />

          <app-custom-select
            label="Estado"
            id="estado-select"
            [items]="[
              { label: 'Activo', value: 'ACTIVO' },
              { label: 'Inactivo', value: 'INACTIVO' }
            ]"
            formControlName="estado"
          />
        </div>

        <section
          class="rounded-lg flex-1 overflow-y-auto max-h-[70dvh] relative border p-4"
        >
          <p class="col-span-full font-medium">Asignar permisos</p>

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
            >{{ edit ? 'Editar' : 'Guardar' }}</app-custom-button
          >
          <app-custom-button
            [variant]="'danger'"
            [icon]="'close'"
            (btnClick)="closeDrawer()"
          >
            Cancelar
          </app-custom-button>
        </section>
      </form>
    </div>
  `,
})
export class ConfigUserComponent implements OnInit, OnChanges {
  @Output() userCreated = new EventEmitter<void>();
  @Input() edit = false;
  @Input() D_user: any;

  unidadesS = inject(UnidadesService);
  toastS = inject(ToastService);
  userS = inject(UserService);
  permitionsS = inject(ConfigService);
  drawerS = inject(PanelService);

  D_permisos: DTO_pPermitionsR | [] = [];
  selectedPermitions: string[] = [];
  valueUnidaes: { label: string; value: string }[] = [];

  userForm = new FormGroup({
    ci: new FormControl({ value: '', disabled: true }),
    name: new FormControl({ value: '', disabled: true }),
    unidadId: new FormControl('', { nonNullable: true }),
    permisos: new FormControl('', { nonNullable: true }),
    rol: new FormControl('', { nonNullable: true }),
    estado: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    this.loadUnidades();
    this.loadPermisos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['D_user'] && changes['D_user'].currentValue) {
      const user = changes['D_user'].currentValue;

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

      if (this.edit) {
        this.userForm.get('ci')?.disable();
        this.userForm.get('name')?.disable();
      } else {
        this.userForm.get('ci')?.enable();
        this.userForm.get('name')?.enable();
      }
    }
  }

  loadUnidades() {
    this.unidadesS
      .all({ total: 0, page: 1, limit: 1000, totalPages: 1 })
      .subscribe({
        next: (value) => {
          this.valueUnidaes = this.mapUnidades(value.items);
        },
        error: (e) => {
          const message =
            e?.error?.errors?.message ||
            e?.error?.message ||
            'Error desconocido';
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

  saveUser() {
    const formData = this.userForm.getRawValue();
    const payload = {
      ci: formData.ci ?? '',
      name: formData.name ?? '',
      unidadId: formData.unidadId,
      permisos: this.selectedPermitions,
      rol: formData.rol,
      estado: formData.estado,
      idUser: this.D_user?.id,
    };

    const request$ = this.edit
      ? this.userS.update(payload)
      : this.userS.create(payload);

    request$.subscribe({
      next: () => {
        this.userCreated.emit();
        this.drawerS.closeDrawer(true);
      },
      error: (e) => {
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

  closeDrawer() {
    this.drawerS.closeDrawer();
  }
}

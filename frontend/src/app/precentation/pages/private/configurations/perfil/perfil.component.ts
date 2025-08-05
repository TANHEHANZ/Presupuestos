import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../infraestructure/services/apis/config.service';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { IconComponent } from '../../../../shared/icons/icon.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  template: `
    <div class=" p-8">
      <form
        class="grid grid-cols-2 gap-4 content-center justify-center items-center "
        [formGroup]="form"
      >
        <app-custom-input
          label="Nombre"
          formControlName="name"
        ></app-custom-input>
        <app-custom-input label="CI" formControlName="ci"></app-custom-input>
        <app-custom-input label="Rol" formControlName="rol"></app-custom-input>
        <app-custom-input
          label="Estado"
          formControlName="estado"
        ></app-custom-input>
        <app-custom-input
          label="Secretaria"
          formControlName="secretaria"
        ></app-custom-input>
        <app-custom-input
          label="Descripcion"
          formControlName="descripcion"
        ></app-custom-input>
        <div class="col-span-full flex justify-end " *ngIf="!changePassword">
          <app-custom-button (btnClick)="togglePasswordForm()">
            Cambiar contraseña
          </app-custom-button>
        </div>

        <div
          *ngIf="changePassword"
          class="col-span-full grid grid-cols-2 gap-4 justify-center items-center bg-primary/5 rounded-xl p-8"
        >
          <p
            class="col-span-full text-violet-600 border p-4 rounded-lg border-violet-200 bg-violet-50"
          >
            <app-icon name="warning" />
            Estas Por cambiar tu contraseña, ingresa una contraseña segura y
            fácil de recordar
          </p>
          <app-custom-input
            label="Contraseña actual"
            type="password"
            formControlName="currentPassword"
          ></app-custom-input>
          <app-custom-input
            type="password"
            label="Nueva contraseña"
            formControlName="newPassword"
          ></app-custom-input>
          <div class="self-end col-span-full flex justify-end gap-4">
            <app-custom-button
              [variant]="'secondary'"
              [icon]="'close'"
              (btnClick)="togglePasswordForm()"
            >
              Cancelar
            </app-custom-button>
            <app-custom-button
              [icon]="'save'"
              (btnClick)="submitPasswordChange()"
            >
              Cambiar contraseña
            </app-custom-button>
          </div>
        </div>
      </form>
    </div>
  `,
  imports: [
    CommonModule,
    CustomInputComponent,
    CustomButtonComponent,
    IconComponent,
    ReactiveFormsModule,
  ],
})
export class PerfilComponent implements OnInit {
  profileS = inject(ConfigService);
  fb = inject(FormBuilder);
  toastS = inject(ToastService);
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      ci: new FormControl({ value: '', disabled: true }),
      name: new FormControl({ value: '', disabled: true }),
      rol: new FormControl({ value: '', disabled: true }),
      estado: new FormControl({ value: '', disabled: true }),
      secretaria: new FormControl({ value: '', disabled: true }),
      descripcion: new FormControl({ value: '', disabled: true }),
    });

    this.profileS.profile().subscribe({
      next: (value) => {
        this.form.patchValue({
          ci: value.ci,
          name: value.name,
          rol: value.rol,
          estado: value.estado,
          secretaria: value.unidadEjecutora?.secretaria ?? '',
          descripcion: value.unidadEjecutora?.descripcion ?? '',
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  changePassword: boolean = false;
  confirmChange: boolean = false;

  togglePasswordForm() {
    this.changePassword = !this.changePassword;
    if (this.changePassword) {
      this.form.addControl(
        'currentPassword',
        new FormControl('', { nonNullable: true })
      );
      this.form.addControl(
        'newPassword',
        new FormControl('', { nonNullable: true })
      );
    } else {
      this.form.removeControl('currentPassword');
      this.form.removeControl('newPassword');
    }
  }
  submitPasswordChange() {
    const { currentPassword, newPassword } = this.form.value;

    if (!currentPassword || !newPassword) {
      this.toastS.addToast({
        title: 'Campos incompletos',
        type: 'info',
        description: 'Debes llenar ambos campos',
      });
      return;
    }

    this.toastS.addToast({
      title: 'Cambio de contraseña',
      type: 'warning',
      description: '¿Estás seguro que quieres cambiar la contraseña?',
      id: 'change-password',
      duration: 0,
      action: {
        label: 'Sí, cambiar',
        callback: () => {
          this.profileS
            .changePassword({
              password: currentPassword,
              newPassword,
              confirmChange: true,
            })
            .subscribe({
              next: (value) => {
                console.log(value);
                this.toastS.addToast({
                  title: 'Contraseña cambiada',
                  type: 'success',
                  description: 'contraseña cambiada con exitó',
                });
                this.togglePasswordForm();
                this.form.get('currentPassword')?.reset();
                this.form.get('newPassword')?.reset();
                this.changePassword = false;
              },
              error: (e) => {
                console.log(e);
                this.toastS.addToast({
                  title: 'Error',
                  type: 'error',
                  description:
                    e.error.errors.message || 'Error al cambiar la contraseña',
                });
                console.log(e);
              },
            });
        },
      },
      cancelAction: {
        label: 'Cancelar',
        callback: () => console.log('Cambio de contraseña cancelado'),
      },
    });
  }
}

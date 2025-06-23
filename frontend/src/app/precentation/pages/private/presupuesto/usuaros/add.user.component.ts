import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { UserService } from '../../../../../infraestructure/services/apis/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { ConfigUserComponent } from './config.user.component';
import { DTO_UserValidR } from '../../../../../infraestructure/models/user/m_valid';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <app-drawer title="Configuración de cuenta de usuario ">
      <ng-container *ngIf="response">
        <app-config-user-component [D_user]="response" />
      </ng-container>
    </app-drawer>

    <app-container title="Agregar usuario">
      <form
        class="flex gap-2 justify-start items-end"
        [formGroup]="form"
        (ngSubmit)="newUser()"
      >
        <app-custom-input
          label="Buscar CI"
          inputId="buscar-ci"
          placeholder="Buscar por ci a usuario para agregarlo"
          [type]="'number'"
          class="w-[60%]"
          formControlName="ci"
        ></app-custom-input>
        <app-custom-button
          type="submit"
          icon="add"
          aria-label="Agregar nuevo usuario"
        >
          Nuevo usuario
        </app-custom-button>
      </form>
    </app-container>
  `,
  selector: 'app-user-add',
  imports: [
    CommonModule,
    CustomInputComponent,
    CustomButtonComponent,
    ContainerComponent,
    ReactiveFormsModule,
    DrawerComponent,
    ConfigUserComponent,
  ],
})
export class AddUserComponent {
  panelS = inject(PanelService);
  userS = inject(UserService);
  toastS = inject(ToastService);
  form = new FormGroup({
    ci: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  response: DTO_UserValidR | undefined = undefined;

  newUser() {
    const formValue = this.form.getRawValue();
    if (this.form.invalid) {
      this.toastS.addToast({
        id: 'invalid-add',
        title: 'Error',
        description: 'Por favor completa todos los campos.',
        type: 'error',
      });
      return;
    }
    this.userS.valid(formValue).subscribe({
      next: (res) => {
        this.toastS.addToast({
          title: 'Exitoso',
          description: 'Usuario valido',
          id: 'login-succes',
          type: 'success',
        });
        this.response = res;
        this.panelS.openDrawer();
        this.form.setValue({
          ci: '',
        });
      },
      error: (e) => {
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'login-error',
          type: 'error',
        });
      },
    });
  }
}

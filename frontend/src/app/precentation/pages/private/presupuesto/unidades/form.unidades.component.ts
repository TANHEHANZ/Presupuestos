import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { UnidadesService } from '../../../../../infraestructure/services/apis/unidades.service';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { DTO_CreateUnidad } from '../../../../../infraestructure/models/unidades/m_ucreate';

@Component({
  selector: 'app-unidades-form',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="addUnidad()"
      class="grid grid-cols-2 gap-4 w-[50dvw]"
    >
      <app-custom-input
        label="UE"
        type="number"
        formControlName="ue"
      ></app-custom-input>
      <app-custom-input
        label="Secretaria "
        formControlName="secretaria"
      ></app-custom-input>
      <app-custom-input
        label="Descripcion"
        formControlName="descripcion"
      ></app-custom-input>

      <app-custom-select
        [items]="[{
            label: 'Activo',
            value: 'ACTIVO',
            },
            {
            label: 'Inactivo',
            value: 'INACTIVO',
        }]"
        [label]="'Estado'"
        formControlName="estado"
      ></app-custom-select>
      <div class="col-span-full flex justify-end gap-2">
        <app-custom-button [variant]="'secondary'" [icon]="'close'"
          >Cancelar</app-custom-button
        >
        <app-custom-button [icon]="'add'" (btnClick)="addUnidad()"
          >Agragar</app-custom-button
        >
      </div>
    </form>
  `,
  standalone: true,
  imports: [
    CustomInputComponent,
    CustomSelectComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
  ],
})
export class FormUnidadesComponent {
  toastS = inject(ToastService);
  unidadS = inject(UnidadesService);
  modalS = inject(PanelService);
  form = new FormGroup({
    ue: new FormControl('', [Validators.required]),
    secretaria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    estado: new FormControl('', [Validators.required]),
  });

  addUnidad() {
    if (this.form.valid) {
      const unidadData = this.form.value as DTO_CreateUnidad;

      this.unidadS.craate(unidadData).subscribe({
        next: (response) => {
          this.toastS.addToast({
            title: 'Éxito',
            description: 'Unidad agregada correctamente',
            id: 'unidad-agregada',
            type: 'success',
          });
          console.log('Unidad agregada:', unidadData);
          console.log('Unidad agregada:', response);
          this.modalS.closeModal(true);
          this.form.reset();
        },
        error: (error) => {
          const message =
            error?.error?.errors?.message ||
            error?.error?.message ||
            'Error desconocido';
          this.toastS.addToast({
            title: 'Error',
            description: message,
            id: 'unidad-error',
            type: 'error',
          });
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../shared/select/select.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { UnidadesService } from '../../../../infraestructure/services/apis/unidades.service';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { DTO_CreateUnidad } from '../../../../infraestructure/models/unidades/m_ucreate';
import {
  DTO_UnidadesR,
  DTO_UnidadesRItems,
} from '../../../../infraestructure/models/unidades/m_unidades';

@Component({
  selector: 'app-unidades-form',
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="submitForm()"
      class="grid grid-cols-2 gap-4 w-[40dvw]"
    >
      <app-custom-input label="UE" type="number" formControlName="ue" />
      <app-custom-input label="Secretaria" formControlName="secretaria" />
      <app-custom-input
        class="col-span-2"
        label="Descripcion"
        formControlName="descripcion"
      />

      <app-custom-select
        [items]="estadoOptions"
        label="Estado"
        formControlName="estado"
      />

      <div class="col-span-full flex justify-end gap-2">
        <app-custom-button
          variant="secondary"
          icon="close"
          (btnClick)="cancelar()"
        >
          Cancelar
        </app-custom-button>

        <app-custom-button
          [icon]="isEditMode ? 'edit' : 'add'"
          (btnClick)="submitForm()"
        >
          {{ isEditMode ? 'Actualizar' : 'Agregar' }}
        </app-custom-button>
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
export class FormUnidadesComponent implements OnInit {
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

  isEditMode = false;
  unidadId: string | null = null;

  estadoOptions = [
    { label: 'Activo', value: 'ACTIVO' },
    { label: 'Inactivo', value: 'INACTIVO' },
  ];

  ngOnInit(): void {
    this.modalS.modalDataState$.subscribe((data: any | null) => {
      if (data) {
        this.isEditMode = true;
        this.unidadId = data.id;
        this.form.patchValue({
          ue: data.ue,
          secretaria: data.secretaria,
          descripcion: data.descripcion,
          estado: data.estado,
        });
      } else {
        this.isEditMode = false;
        this.unidadId = null;
      }
    });
    this.modalS.modalState$.subscribe((isOpen) => {
      if (!isOpen) {
        this.resetForm();
      }
    });
  }
  private resetForm() {
    this.isEditMode = false;
    this.unidadId = null;
    this.form.reset();
  }

  submitForm() {
    if (this.form.invalid) {
      this.toastS.addToast({
        title: 'Error',
        description: 'Formulario inválido',
        id: 'unidad-form-invalido',
        type: 'error',
      });
      return;
    }

    const unidadData = this.form.value as DTO_CreateUnidad;

    if (this.isEditMode && this.unidadId) {
      this.unidadS
        .update({
          ...unidadData,
          id: this.unidadId,
        })
        .subscribe({
          next: (res) => {
            this.toastS.addToast({
              title: 'Actualizado',
              description: 'Unidad actualizada correctamente',
              id: 'unidad-editada',
              type: 'success',
            });
            this.modalS.closeModal(true);
          },
          error: (error) => {
            const message =
              error?.error?.errors?.message ||
              error?.error?.message ||
              'Error desconocido';
            this.toastS.addToast({
              title: 'Error',
              description: message,
              id: 'unidad-edit-error',
              type: 'error',
            });
          },
        });
    } else {
      this.unidadS.craate(unidadData).subscribe({
        next: (res) => {
          this.toastS.addToast({
            title: 'Éxito',
            description: 'Unidad agregada correctamente',
            id: 'unidad-agregada',
            type: 'success',
          });
          this.modalS.closeModal(true);
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
    }
  }

  cancelar() {
    this.modalS.closeModal();
  }
}

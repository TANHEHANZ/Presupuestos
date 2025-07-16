import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../shared/select/select.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { UnidadesService } from '../../../../infraestructure/services/apis/unidades.service';
import { PermissionKey } from '../../../../infraestructure/constants/permitions';
import { hasPermissions } from '../../../../infraestructure/utils/checkPermitions';
import { MeService } from '../../../../infraestructure/services/components/me.service';
import { P_unit } from '../../../../infraestructure/constants/permitions/p_unidades';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unidades-detail',
  template: `
    <form
      [formGroup]="Form"
      class="grid grid-cols-4 w-full gap-y-8 gap-x-2 mt-4"
    >
      <app-custom-input label="UE" formControlName="ue" />
      <app-custom-input label="Secretaria" formControlName="secretaria" />
      <app-custom-input label="Descripcion" formControlName="descripcion" />
      <app-custom-select
        label="Estado"
        [items]="estadoOptions"
        formControlName="estado"
      />
      <div class="col-span-full flex justify-end gap-2 ">
        <app-custom-button
          *ngIf="canPermission[P_unit.DELETE]"
          [variant]="'olther'"
          [icon]="'delete'"
          (btnClick)="deleteUnidad()"
          >Eliminar</app-custom-button
        >
        <app-custom-button
          *ngIf="canPermission[P_unit.UPDATE]"
          icon="edit"
          (btnClick)="editarUnidades()"
          >Editar
        </app-custom-button>
      </div>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    CustomSelectComponent,
    CustomButtonComponent,
    CommonModule,
  ],
})
export class DetailUnidadesComponent implements OnInit {
  Form!: FormGroup;
  D_Unidades = input<any>();
  meService = inject(MeService);
  modalS = inject(PanelService);
  toastS = inject(ToastService);
  unidadesS = inject(UnidadesService);
  estadoOptions: { label: string; value: string }[] = [];
  PermitionsForm = input<PermissionKey[]>([]);
  canPermission: Record<PermissionKey, boolean> = {} as any;
  P_unit = P_unit;
  ngOnInit(): void {
    this.canPermission = hasPermissions(
      this.PermitionsForm(),
      this.meService.permissions
    );
    console.log(this.canPermission);
    const unidades = this.D_Unidades();
    this.estadoOptions = [{ label: unidades.estado, value: unidades.estado }];

    this.Form = new FormGroup({
      ue: new FormControl({ value: unidades?.ue ?? '', disabled: true }),
      secretaria: new FormControl({
        value: unidades?.secretaria ?? '',
        disabled: true,
      }),
      descripcion: new FormControl({
        value: unidades?.descripcion ?? '',
        disabled: true,
      }),
      estado: new FormControl({
        value: unidades?.estado ?? '',
        disabled: true,
      }),
      createdAt: new FormControl({
        value: unidades?.createdAt ?? '',
        disabled: true,
      }),
    });
  }
  deleteUnidad() {
    this.toastS.addToast({
      title: '¿Eliminar Unidad Ejecutora?',
      description: '¿Estás seguro de eliminar esta Unidad Ejecutora?',
      type: 'warning',
      action: {
        label: 'Eliminar',
        callback: async () => {
          this.unidadesS.deleted({ id: this.D_Unidades().id }).subscribe({
            next: () => {
              this.toastS.addToast({
                title: 'Unidad Ejecutora Eliminada',
                description:
                  'La Unidad Ejecutora ha sido eliminada correctamente.',
                type: 'success',
              });
              this.modalS.closeModal(true);
            },
            error: () => {
              this.toastS.addToast({
                title: 'Error al eliminar Unidad Ejecutora',
                description:
                  'Ocurrió un error al eliminar la Unidad Ejecutora.',
                type: 'error',
              });
            },
          });
        },
      },
      cancelAction: {
        label: 'Cancelar',
        callback: () => {
          console.log('Eliminación cancelada');
        },
      },
    });
  }

  editarUnidades() {
    this.modalS.openModalWithData(this.D_Unidades());
  }
}

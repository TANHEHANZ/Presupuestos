import { Component, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { PresupuestarDetailComponent } from './p_detail.component';
import { CalendarComponent } from './calendar.component';
import { UploadExcelComponent } from './upload-items.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { PresupuestoService } from '../../../../../infraestructure/services/apis/presupuesto.service';
import { DTO_presupuestoUnidadesR } from '../../../../../infraestructure/models/presupuestos/unidad/m_presupuestoUnidad';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';

@Component({
  selector: 'presupuestos-component',
  template: ` <app-modal title="Subir excel ">
      <app-upload-excel />
    </app-modal>
    <app-wrapper
      title="Presupuesto por unidad ejecutora"
      [path]="{
        initial: 'Modulos',
        finally: 'unidad ejecutora'
      }"
    >
      <app-calendar-component />
      <app-container title="Subir presupuesto por unidad">
        <div class="self-start flex ">
          <app-custom-button [icon]="'add'" (btnClick)="openDrawe()">
            Subir excel
          </app-custom-button>
        </div>
      </app-container>
      <app-main-table
        title="Registros presupuestos por unidad ejecutora"
        [columns]="columns"
        [data]="dataPresupuesto"
        [rowExpandTemplate]="expandTemplate"
        [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Filtrar por ue ,unidad ejecutora',
          buttonLabel: 'filtrar',
          icon: 'filter',
        }"
        [export]="{
          types: ['csv', 'pdf'],
          data: []
        }"
      ></app-main-table>
      <ng-template #expandTemplate let-row>
        <app-presupuestar-detail />
      </ng-template>
    </app-wrapper>`,
  imports: [
    WrapperComponent,
    MainTableComponent,
    PresupuestarDetailComponent,
    CalendarComponent,
    ModalComponent,
    ContainerComponent,
    CustomButtonComponent,
    UploadExcelComponent,
  ],
})
export class PresupuestarComponent implements OnInit {
  drawerS = inject(PanelService);
  toastS = inject(ToastService);
  presupuestoUniS = inject(PresupuestoService);
  dataPresupuesto: DTO_presupuestoUnidadesR = [];
  openDrawe() {
    this.drawerS.openModal();
  }
  ngOnInit(): void {
    this.loadPresupuestos();
    this.drawerS.refresh$.subscribe(() => {
      this.loadPresupuestos();
    });
  }
  loadPresupuestos() {
    try {
      this.presupuestoUniS.list().subscribe({
        next: (value) => {
          this.dataPresupuesto = value;
          console.log(this.dataPresupuesto);
        },

        error: (e) => {
          console.log(e);
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
    } catch (error) {
      console.log(error);
    }
  }

  data = [];
  columns: {
    header: string;
    accessor: keyof DTO_presupuestoUnidadesR[number] | string;
  }[] = [
    { header: 'UE', accessor: 'ue' },
    { header: 'Unidad Ejecutora', accessor: 'descripcion' },
    { header: 'Monto Vijente', accessor: 'montoVigente' },
    { header: 'Monto Presupuestado', accessor: 'montoProgramado' },
  ];
}

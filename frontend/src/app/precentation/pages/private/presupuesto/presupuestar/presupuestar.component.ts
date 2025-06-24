import { Component, inject } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { PresupuestarDetailComponent } from './p_detail.component';
import { CalendarComponent } from './calendar.component';
import { UploadExcelComponent } from './upload-items.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';

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
        [columns]="columns"
        [data]="data"
        [rowExpandTemplate]="expandTemplate"
        title="Registros de usuarios"
        [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Filtrar por nombre ,ci',
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
export class PresupuestarComponent {
  drawerS = inject(PanelService);
  openDrawe() {
    this.drawerS.openModal();
  }
  data = [];
  columns = [
    { header: 'UE', accessor: 'ci' },
    { header: 'Unidad Ejecutora', accessor: 'name' },
    { header: 'Monto Vijente', accessor: 'rol' },
    { header: 'Monto Presupuestado', accessor: 'estado' },
  ];
}

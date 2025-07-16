import { Component, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../shared/table/main.table.component';
import { PresupuestarDetailComponent } from './p_detail.component';
import { UploadExcelComponent } from './upload-items.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ContainerComponent } from '../../../shared/container/container.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { PresupuestoService } from '../../../../infraestructure/services/apis/presupuesto.service';
import { DTO_presupuestoUnidadesItem } from '../../../../infraestructure/models/presupuestos/unidad/m_presupuestoUnidad';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { DTO_FilterPresupuestoUnidad } from '../../../../infraestructure/models/presupuestos/unidad/m_filters';
import { CalendarComponent } from './calendar.component';
import { P_preUnidad } from '../../../../infraestructure/constants/permitions/p_preUnidad';
import { hasPermissions } from '../../../../infraestructure/utils/checkPermitions';
import { PermissionKey } from '../../../../infraestructure/constants/permitions';
import { MeService } from '../../../../infraestructure/services/components/me.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'presupuestos-component',
  template: ` <app-modal title="Subir excel ">
      <app-upload-excel *ngIf="canPermission[P_preUnidad.UPLODAD]" />
    </app-modal>
    <app-wrapper
      title="Presupuesto por unidad ejecutora"
      [path]="{
        initial: 'Modulos',
        finally: 'unidad ejecutora'
      }"
    >
      <app-calendar-component *ngIf="canPermission[P_preUnidad.UPLODAD]" />
      <app-container
        title="Subir presupuesto por unidad"
        *ngIf="canPermission[P_preUnidad.UPLODAD]"
      >
        <div class="self-start flex ">
          <app-custom-button [icon]="'add'" (btnClick)="openDrawe()">
            Subir excel
          </app-custom-button>
        </div>
      </app-container>
      <app-main-table
        title="Listado de proyectos"
        [columns]="columns"
        [data]="data"
        [searchConfig]="{
          label: 'Filtrar',
          placeholder: 'Aca podras filtrar',
          buttonLabel: 'filtrar',
          icon: 'filter'
        }"
        [export]="{
          types: ['csv', 'pdf'],
          data: []
        }"
        [currentLimit]="filter.limit"
        [permissionsRequired]="[permisos.table]"
        (limitChange)="onLimitChange($event)"
        [fetchPageData]="fetchPageData"
        [totalPagesInput]="filter.totalPages"
      />

      <ng-template #expandTemplate let-row>
        <app-presupuestar-detail />
      </ng-template>
    </app-wrapper>`,
  imports: [
    WrapperComponent,
    MainTableComponent,
    PresupuestarDetailComponent,
    ModalComponent,
    ContainerComponent,
    CustomButtonComponent,
    UploadExcelComponent,
    CalendarComponent,
    CommonModule,
  ],
})
export class PresupuestarComponent implements OnInit {
  drawerS = inject(PanelService);
  toastS = inject(ToastService);
  meService = inject(MeService);

  presupuestoUniS = inject(PresupuestoService);
  dataPresupuesto: DTO_presupuestoUnidadesItem = [];
  P_preUnidad = P_preUnidad;

  permisos = {
    table: P_preUnidad.LIST,
    form: [P_preUnidad.UPLODAD],
  };
  filter: DTO_FilterPresupuestoUnidad = {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  };
  canPermission: Record<PermissionKey, boolean> = {} as any;

  openDrawe() {
    this.drawerS.openModal();
  }
  ngOnInit(): void {
    this.canPermission = hasPermissions(
      this.permisos.form,
      this.meService.permissions
    );
    this.loadPresupuestos(1);
    this.drawerS.refresh$.subscribe(() => {
      this.loadPresupuestos(1);
    });
  }
  loadPresupuestos(page: number = 1) {
    this.filter.page = page;
    this.presupuestoUniS.list(this.filter).subscribe({
      next: (value) => {
        this.data = value.items;
        this.filter = {
          ...this.filter,
          page: value.page,
          limit: value.limit,
          total: value.total,
          totalPages: value.totalPages,
        };
      },
      error: (e) => {
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

  data = [];
  columns: {
    header: string;
    accessor: keyof DTO_presupuestoUnidadesItem[number] | string;
  }[] = [
    { header: 'UE', accessor: 'ue' },
    { header: 'Unidad Ejecutora', accessor: 'descripcion' },
    { header: 'Monto Vijente', accessor: 'montoVigente' },
    { header: 'Monto Presupuestado', accessor: 'montoProgramado' },
  ];

  fetchPageData = async (
    page: number
  ): Promise<{ data: DTO_presupuestoUnidadesItem; totalPages: number }> => {
    return new Promise((resolve, reject) => {
      this.filter.page = page;

      this.presupuestoUniS.list(this.filter).subscribe({
        next: (value) => {
          this.dataPresupuesto = value.items;

          this.filter = {
            ...this.filter,
            page: value.page,
            limit: value.limit,
            total: value.total,
            totalPages: value.totalPages,
          };

          resolve({
            data: value.items,
            totalPages: value.totalPages,
          });
        },
        error: (e) => reject(e),
      });
    });
  };

  onLimitChange(newLimit: number) {
    this.filter.limit = newLimit;
    this.loadPresupuestos(1);
  }
}

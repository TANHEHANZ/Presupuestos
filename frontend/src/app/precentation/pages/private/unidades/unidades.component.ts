import { Component, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../shared/table/main.table.component';
import { TableColumn } from '../../../shared/table/table.component';
import { DetailUnidadesComponent } from './detail.component';
import { UnidadesService } from '../../../../infraestructure/services/apis/unidades.service';
import {
  DTO_FilterUnidad,
  DTO_UnidadesR,
} from '../../../../infraestructure/models/unidades/m_unidades';
import { ImportUnidadesComponent } from './add.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormUnidadesComponent } from './form.unidades.component';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { P_unit } from '../../../../infraestructure/constants/permitions/p_unidades';
import { hasPermissions } from '../../../../infraestructure/utils/checkPermitions';

@Component({
  selector: 'app-unidades',
  template: `
    <app-modal title="Formulario de unidades ejecutoras">
      <app-unidades-form />
    </app-modal>
    <app-wrapper
      title="Unidades Ejecutoras"
      [path]="{
        initial: 'Modulos',
        finally: 'Unidades Ejecutoras'
      }"
    >
      <app-add-unidades />

      <app-main-table
        [columns]="columns"
        [data]="data"
        [rowExpandTemplate]="expandTemplate"
        title="Listado de unidades ejecutoras"
        [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Busca por UE o  secretaria ',
          buttonLabel: 'Filtrar',
          icon: 'filter',
        }"
        [currentLimit]="filter.limit"
        (limitChange)="onLimitChange($event)"
        [fetchPageData]="fetchPageData"
        (searchChange)="searchChange($event)"
        [totalPagesInput]="filter.totalPages"
        [permissionsRequired]="[permisos.table]"
      ></app-main-table>
      <ng-template #expandTemplate let-row>
        <app-unidades-detail
          [D_Unidades]="row"
          [PermitionsForm]="permisos.form"
        />
      </ng-template>
    </app-wrapper>
  `,
  imports: [
    WrapperComponent,
    MainTableComponent,
    DetailUnidadesComponent,
    ImportUnidadesComponent,
    ModalComponent,
    FormUnidadesComponent,
  ],
})
export class UnidadesComponent implements OnInit {
  unidadesS = inject(UnidadesService);
  data: DTO_UnidadesR[] = [];
  modalS = inject(PanelService);
  filter: DTO_FilterUnidad = {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  };

  permisos = {
    table: P_unit.LIST,
    form: [P_unit.CREATE, P_unit.UPDATE, P_unit.DELETE],
  };
  ngOnInit(): void {
    // console.log(this.permisos);
    this.fetchPageData(1);

    this.modalS.refresh$.subscribe(() => {
      this.fetchPageData(1);
    });
  }

  private loadUnidades(
    page: number
  ): Promise<{ items: DTO_UnidadesR[]; totalPages: number }> {
    this.filter.page = page;

    return new Promise((resolve, reject) => {
      this.unidadesS.all(this.filter).subscribe({
        next: (res) => {
          this.data = res.items;

          this.filter = {
            ...this.filter,
            page: res.page,
            limit: res.limit,
            total: res.total,
            totalPages: res.totalPages,
          };

          resolve({
            items: res.items,
            totalPages: res.totalPages,
          });
        },
        error: (e) => {
          console.error('Error al cargar unidades:', e);
          reject(e);
        },
      });
    });
  }

  fetchPageData = async (
    page: number
  ): Promise<{ data: DTO_UnidadesR[]; totalPages: number }> => {
    const { items, totalPages } = await this.loadUnidades(page);
    return {
      data: items,
      totalPages,
    };
  };

  columns: TableColumn<any>[] = [
    { header: 'UE', accessor: 'ue' },
    { header: 'Secretaría', accessor: 'secretaria' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Estado', accessor: 'estado' },
  ];

  onLimitChange(newLimit: number) {
    this.filter.limit = newLimit;
    this.fetchPageData(1);
  }

  searchChange(query: string) {
    console.log('Search query:', query);
    // puedes aplicar lógica de filtrado aquí si necesitas
  }
}

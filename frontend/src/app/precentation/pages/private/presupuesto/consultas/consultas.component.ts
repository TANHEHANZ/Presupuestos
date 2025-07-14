import { Component, inject } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { TableColumn } from '../../../../shared/table/table.component';
import { FormConsultas } from './form.component';
import { ConsultasService } from '../../../../../infraestructure/services/apis/consultas.service';
import { firstValueFrom } from 'rxjs';
import { DTO_consultaQuery } from '../../../../../infraestructure/models/consultas/m_query';
import { DTO_consultasRItems } from '../../../../../infraestructure/models/consultas/m_consultas';

@Component({
  selector: 'app-consultas',
  template: `
    <app-wrapper
      title="Consultas"
      [path]="{ initial: 'Modulos', finally: 'Consultas' }"
    >
      <app-form-consultas (filtrar)="handleFiltrar($event)" />
      <app-main-table
        [columns]="columns"
        [data]="data"
        title="Listado de unidades ejecutoras"
        [fetchPageData]="fetchPageData"
        [currentLimit]="limit"
        [totalPagesInput]="totalPages"
        (limitChange)="onLimitChange($event)"
      />
    </app-wrapper>
  `,
  imports: [
    WrapperComponent,
    ReactiveFormsModule,
    MainTableComponent,
    FormConsultas,
  ],
  standalone: true,
})
export class ConsultasComponent {
  private consultaS = inject(ConsultasService);

  columns: TableColumn<any>[] = [
    { header: 'Mes', accessor: 'mes' },
    { header: 'DA', accessor: 'da' },
    { header: 'UE', accessor: 'ue' },
    { header: 'Cat Prg', accessor: 'catPrg' },
    { header: 'FTE', accessor: 'fte' },
    { header: 'ORG', accessor: 'org' },
    { header: 'Objeto de Gasto', accessor: 'objetoGasto' },
    { header: 'Presupuesto Vigente', accessor: 'presupuestoVigente' },
    { header: 'Total Programado', accessor: 'totalProgramacion' },
    { header: 'Devengado', accessor: 'devengado' },
    { header: 'Descripción de Gasto', accessor: 'descrpcionObjetoGasto' },
    { header: 'Unidad Ejecutora', accessor: 'unidadEjecutora' },
  ];

  data: DTO_consultasRItems[] = [];
  filters: DTO_consultaQuery | null = null;
  page = 1;
  limit = 8;
  totalPages = 1;

  handleFiltrar(filtro: DTO_consultaQuery) {
    this.filters = filtro;
    this.fetchPageData(this.page);
  }

  getDataOfFilter(filter: DTO_consultaQuery) {
    this.consultaS.filter(filter).subscribe({
      next: (value) => {
        const adaptedItems = value.items.map((item: any) => ({
          ...item,
          unidadEjecutora: item.unidadEjecutora?.secretaria ?? '',
        }));

        this.data = adaptedItems;
        this.onLimitChange(value.totalPages);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLimitChange(newLimit: number) {
    this.limit = newLimit;
    this.page = 1;
    this.fetchPageData(this.page);
  }

  fetchPageData = async (
    page: number
  ): Promise<{ data: DTO_consultasRItems[]; totalPages: number }> => {
    if (!this.filters) return { data: [], totalPages: 1 };

    try {
      const response = await firstValueFrom(
        this.consultaS.filter({
          ...this.filters,
          limit: this.limit,
          page,
        })
      );

      this.page = page;
      this.totalPages = response.totalPages;

      const adaptedItems = response.items.map((item: any) => ({
        ...item,
        unidadEjecutora: item.unidadEjecutora?.secretaria ?? '',
      }));

      this.data = adaptedItems;

      return {
        data: adaptedItems,
        totalPages: response.totalPages,
      };
    } catch (err) {
      console.error('Error al cargar datos:', err);
      return {
        data: [],
        totalPages: 1,
      };
    }
  };
}

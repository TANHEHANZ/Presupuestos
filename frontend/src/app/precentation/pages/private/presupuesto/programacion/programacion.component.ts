import { Component, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { DTO_proyectosRItems } from '../../../../../infraestructure/models/presupuestos/proyectos/m_proyectos';
import { DTO_Filter } from '../../../../../infraestructure/models/programation/m_filter';
import { DetailComponent } from './detail.component';
import { ProgramationService } from '../../../../../infraestructure/services/apis/programation.service';
import {
  DTO_ProgramationR,
  DTO_ProgramationRData,
} from '../../../../../infraestructure/models/programation/m_programation';

@Component({
  selector: 'programacion-compoenent',
  template: `
    <app-wrapper
      title="Programacion financiera"
      [path]="{
        initial: 'Modulos',
        finally: 'Programacion financiera'
      }"
    >
      <app-main-table
        title="Listado de proyectos"
        [columns]="columns"
        [data]="data"
        [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Aca podras filtrar',
          buttonLabel: 'filtrar',
          icon: 'filter',
        }"
        [export]="{
          types: ['csv', 'pdf'],
          data: []
        }"
        [currentLimit]="filter.limit"
        (limitChange)="onLimitChange($event)"
        [fetchPageData]="fetchPageData"
        (searchChange)="searchChange($event)"
        [rowExpandTemplate]="expand"
      ></app-main-table>
      <ng-template #expand let-row>
        <detail-presupuesto [D_Presupuesto]="row" />
      </ng-template>
    </app-wrapper>
  `,
  imports: [WrapperComponent, MainTableComponent, DetailComponent],
})
export class ProgramacionComponent implements OnInit {
  programationS = inject(ProgramationService);
  toastS = inject(ToastService);
  data: DTO_ProgramationRData = [];

  filter: DTO_Filter = {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  };

  ngOnInit(): void {
    this.loadProgram(1);
  }
  loadProgram(page: number = 1) {
    this.filter.page = page;

    this.programationS.list(this.filter).subscribe({
      next: (value) => {
        this.data = value.items.map((item: any) => ({
          ...item.presupuesto,
          programacion: item.programacion,
          unidadEjecutoraDescripcion:
            item.presupuesto.unidadEjecutora.descripcion,
          unidadEjecutoraSecretaria:
            item.presupuesto.unidadEjecutora.secretaria,
        }));

        console.log(this.data);
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

  columns: { header: string; accessor: string }[] = [
    { header: 'Cat Prg', accessor: 'CatPrg' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'FTE', accessor: 'fte' },
    { header: 'ORG', accessor: 'org' },
    { header: 'Objeto', accessor: 'objetoGasto' },
    { header: 'Descripción Gasto', accessor: 'codigoObjetoGasto' },
    { header: 'Presupuesto Vigente', accessor: 'presupuestoVigente' },

    { header: 'Mes', accessor: 'mes' },
  ];

  searchChange(e: any) {
    console.log(e);
  }
  fetchPageData = async (
    page: number
  ): Promise<{ data: DTO_ProgramationRData; totalPages: number }> => {
    return new Promise((resolve, reject) => {
      this.filter.page = page;

      this.programationS.list(this.filter).subscribe({
        next: (value) => {
          this.data = value.items.map((item: any) => ({
            ...item.presupuesto,
            programacion: item.programacion,
            unidadEjecutoraDescripcion:
              item.presupuesto.unidadEjecutora.descripcion,
            unidadEjecutoraSecretaria:
              item.presupuesto.unidadEjecutora.secretaria,
          }));
          console.log(this.filter);
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
    this.loadProgram(1);
  }
}

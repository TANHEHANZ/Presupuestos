import { Component, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { TableColumn } from '../../../../shared/table/table.component';
import { Proyecto } from '../../../../../infraestructure/global/proyecto';
import { ProyectoService } from '../../../../../infraestructure/services/apis/proyecto.service';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { DTO_proyectosR } from '../../../../../infraestructure/models/presupuestos/proyectos/m_proyectos';

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
        (searchChange)="searchChange($event)"
      ></app-main-table>
      <!-- <ng-template #expandTemplate let-row>
        
      </ng-template> -->
    </app-wrapper>
  `,
  imports: [WrapperComponent, MainTableComponent],
})
export class ProgramacionComponent implements OnInit {
  proyectoS = inject(ProyectoService);
  toastS = inject(ToastService);
  data: DTO_proyectosR = [];

  ngOnInit(): void {
    this.loadProgram();
  }
  loadProgram() {
    try {
      this.proyectoS.list().subscribe({
        next: (value) => {
          this.data = value;
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

  // ue

  // objetoGasto
  // descripcionGasto
  // presupuestoVigente
  // devengado
  // porcentajeEjecucion
  // unidad
  columns: {
    header: string;
    accessor: keyof DTO_proyectosR[number] | string;
  }[] = [
    // { header: 'Cat Prg', accessor: 'org' },
    { header: 'Descripcion', accessor: 'descripcionGasto' },
    // { header: 'FTE', accessor: 'fte' },
    { header: 'Org', accessor: 'org' },
    { header: 'Objeto', accessor: 'objetoGasto' },
    { header: 'Descripcion gasto', accessor: 'descripcionGasto' },
    { header: 'Presup Vigente', accessor: 'presupuestoVigente' },
  ];
  searchChange(e: any) {}
}

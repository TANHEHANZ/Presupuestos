import { Component } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../../../shared/table/table.component';
import { RegistrosDetailComponent } from './detail.component';
import { Proyecto } from '../../../../../infraestructure/global/proyecto';

const DATA: Proyecto[] = [
  {
    catPrg: '000 0 100',
    descripcion: 'desc',
    fte: 20,
    org: 210,
    objeto: '2.2.1.10',
    descripcionGasto: 'Pasaje Interior del pais',
    presupVigente: 17500,
  },
  {
    catPrg: '000 0 100',
    descripcion: 'desc',
    fte: 20,
    org: 210,
    objeto: '2.2.2.10',
    descripcionGasto: 'Viaticos interior pais',
    presupVigente: 24000,
  },
  {
    catPrg: '000 0 100',
    descripcion: 'desc',
    fte: 20,
    org: 210,
    objeto: '3.2.1',
    descripcionGasto: 'Papel',
    presupVigente: 103450,
  },
];

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [TableComponent, RegistrosDetailComponent],
  template: `
    <section>
      <h1 class="font-bold text-3xl mb-4">Listado de proyectos</h1>
      <article class="overflow-x-auto h-full bg-white rounded-lg min-h-[75dvh]">
        <app-table
          [columns]="columns"
          [data]="data"
          [rowExpandTemplate]="expandTemplate"
        ></app-table>
        <ng-template #expandTemplate let-row>
          <app-registros-detail [row]="row" />
        </ng-template>
      </article>
    </section>
  `,
})
export class RegiostrosComponent {
  columns: TableColumn<Proyecto>[] = [
    { header: 'Cat Prg', accessor: 'catPrg' },
    { header: 'Descripcion', accessor: 'descripcion' },
    { header: 'FTE', accessor: 'fte' },
    { header: 'Org', accessor: 'org' },
    { header: 'Objeto', accessor: 'objeto' },
    { header: 'Descripcion gasto', accessor: 'descripcionGasto' },
    { header: 'Presup Vigente', accessor: 'presupVigente' },
  ];
  data = DATA;
}

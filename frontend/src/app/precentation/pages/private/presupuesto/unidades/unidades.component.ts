import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { TableColumn } from '../../../../shared/table/table.component';
import { D_Unidades } from '../../../../../infraestructure/modules/unidades/unidades';
import { DetailUnidadesComponent } from './detail.component';
import { ImportUnidadesComponent } from './import.component';

@Component({
  selector: 'app-unidades',
  template: `
    <app-wrapper
      title="Unidades Ejecutoras"
      [path]="{
        initial: 'Modulos',
        finally: 'Unidades Ejecutoras'
      }"
    >
      <!-- <app-import-Unidades /> -->

      <app-main-table
        [columns]="columns"
        [data]="data"
        [rowExpandTemplate]="expandTemplate"
        title="Lisatado de unidades ejecutoras"
        [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Filtrar por nombre ,ci',
          buttonLabel: 'filtrar',
          icon: 'filter',
        }"
        (searchChange)="searchChange($event)"
      ></app-main-table>
      <ng-template #expandTemplate let-row>
        <app-unidades-detail />
      </ng-template>
    </app-wrapper>
  `,
  imports: [
    WrapperComponent,
    MainTableComponent,
    DetailUnidadesComponent,
    ImportUnidadesComponent,
  ],
})
export class UnidadesComponent {
  data = D_Unidades;
  columns: TableColumn<any>[] = [
    { header: 'CI', accessor: 'ci' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'rol' },
    { header: 'Estado', accessor: 'estado' },
    { header: 'Fecha Creación', accessor: 'createdAt' },
  ];
  searchChange(data: string) {}
}

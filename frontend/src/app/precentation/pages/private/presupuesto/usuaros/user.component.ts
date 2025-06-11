import { Component } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../../../shared/table/table.component';
import { D_User } from '../../../../../infraestructure/modules/presupuesto/usuarios';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from './detail.component';

@Component({
  selector: 'app-user',
  template: `<section>
    <app-table
      [columns]="columns"
      [data]="data"
      [rowExpandTemplate]="expandTemplate"
    ></app-table>
    <ng-template #expandTemplate let-row>
      <app-usuer-detail [D_user]="row" />
    </ng-template>
  </section> `,
  imports: [TableComponent, CommonModule, DetailUserComponent],
})
export class UserComponent {
  data = D_User;
  columns: TableColumn<R_UserDTO>[] = [
    { header: 'CI', accessor: 'ci' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'rol' },
    { header: 'Estado', accessor: 'estado' },
    { header: 'Fecha Creación', accessor: 'createdAt' },
  ];
}

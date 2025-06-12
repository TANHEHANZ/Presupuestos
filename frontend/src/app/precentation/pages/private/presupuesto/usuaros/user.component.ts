import { Component, inject } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../../../shared/table/table.component';
import { D_User } from '../../../../../infraestructure/modules/presupuesto/usuarios';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from './detail.component';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { ConfigUserComponent } from './config.user.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { AddUserComponent } from './add.user.component';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';

@Component({
  selector: 'app-user',
  template: `
    <app-drawer title="Configuración de cuenta de usuario ">
      <app-config-user-component [D_user]="data[0]" />
    </app-drawer>
    <app-wrapper
      title="Usuarios"
      [path]="{
        initial: 'Modulos',
        finally: 'Usuarios'
      }"
    >
      <app-user-add />
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
        (searchChange)="searchChange($event)"
      ></app-main-table>
      <ng-template #expandTemplate let-row>
        <app-usuer-detail [D_user]="row" />
      </ng-template>
    </app-wrapper>
  `,
  imports: [
    CommonModule,
    DetailUserComponent,
    DrawerComponent,
    ConfigUserComponent,
    MainTableComponent,
    AddUserComponent,
    WrapperComponent,
  ],
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
  searchChange(value: string) {
    console.log('capturados', value);
  }
}

import { Component, inject } from '@angular/core';
import {
  TableColumn,
  TableComponent,
} from '../../../../shared/table/table.component';
import { D_User } from '../../../../../infraestructure/modules/presupuesto/usuarios';
import { R_UserDTO } from '../../../../../infraestructure/modules/presupuesto/types';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from './detail.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { ConfigUserComponent } from './config.user.component';

@Component({
  selector: 'app-user',
  template: `
    <app-drawer title="Configuración">
      <app-config-user-component />
    </app-drawer>
    <section class="flex flex-col gap-4 h-full min-h-[82vh]">
      <h1 class="text-3xl font-medium">Usuarios</h1>

      <section
        class="bg-white rounded-lg p-8 flex justify-between items-center"
      >
        <div class="flex gap-2 justify-start items-end w-[40%]">
          <app-custom-input
            label="Buscar CI"
            inputId="buscar-ci"
            placeholder="Buscar por ci a usuario para agregarlo"
            [type]="'text'"
            class="w-[60%]"
          ></app-custom-input>
          <app-custom-button
            type="button"
            icon="add"
            (click)="newUser()"
            aria-label="Agregar nuevo usuario"
          >
            Nuevo usuario
          </app-custom-button>
        </div>
        <div class="flex gap-4  justify-center items-end min-w-[32rem]">
          <app-custom-input
            label="Filtrar"
            [type]="'text'"
            placeholder="Filtrar por CI"
            class="w-full"
          ></app-custom-input>
          <app-custom-button type="submit" icon="search"
            >Buscar</app-custom-button
          >
        </div>
      </section>
      <section class="p-8 rounded-lg bg-white flex-1 h-0 flex flex-col">
        <p class="font-medium my-4">Registros de usuarios</p>
        <app-table
          [columns]="columns"
          [data]="data"
          [rowExpandTemplate]="expandTemplate"
          class="flex-1"
        ></app-table>
        <ng-template #expandTemplate let-row>
          <app-usuer-detail [D_user]="row" />
        </ng-template>
      </section>
    </section>
  `,
  imports: [
    TableComponent,
    CommonModule,
    DetailUserComponent,
    CustomInputComponent,
    CustomButtonComponent,
    DrawerComponent,
    ConfigUserComponent,
  ],
})
export class UserComponent {
  panelS = inject(PanelService);
  data = D_User;
  columns: TableColumn<R_UserDTO>[] = [
    { header: 'CI', accessor: 'ci' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rol', accessor: 'rol' },
    { header: 'Estado', accessor: 'estado' },
    { header: 'Fecha Creación', accessor: 'createdAt' },
  ];
  newUser() {
    this.panelS.openDrawer();
  }
}

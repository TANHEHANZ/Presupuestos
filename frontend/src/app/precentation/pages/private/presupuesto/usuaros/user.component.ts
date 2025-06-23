import { Component, inject, OnInit } from '@angular/core';
import { TableColumn } from '../../../../shared/table/table.component';
import { D_User } from '../../../../../infraestructure/modules/presupuesto/usuarios';
import { CommonModule } from '@angular/common';
import { DetailUserComponent } from './detail.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { AddUserComponent } from './add.user.component';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { UserService } from '../../../../../infraestructure/services/apis/user.service';
import { DTO_uList } from '../../../../../infraestructure/models/user/m_list';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';

@Component({
  selector: 'app-user',
  template: `
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
    MainTableComponent,
    AddUserComponent,
    WrapperComponent,
  ],
})
export class UserComponent implements OnInit {
  userS = inject(UserService);
  toastS = inject(ToastService);
  panelS = inject(PanelService);
  data: DTO_uList = [];
  ngOnInit(): void {
    this.loadUser();
    this.panelS.refresh$.subscribe(() => {
      this.loadUser();
    });
  }
  loadUser() {
    try {
      this.userS.list().subscribe({
        next: (value) => {
          this.data = value.map((user: any) => ({
            ...user,
            unidadSecretaria: user.unidadEjecutora.secretaria,
            ue: user.unidadEjecutora.ue,
          }));
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

  columns: { header: string; accessor: keyof DTO_uList[number] | string }[] = [
    { header: 'CI', accessor: 'ci' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Rol', accessor: 'rol' },
    { header: 'Estado', accessor: 'estado' },
    { header: 'ue', accessor: 'ue' },
    { header: 'Unidad', accessor: 'unidadSecretaria' },
  ];

  searchChange(value: string) {
    console.log('capturados', value);
  }
}

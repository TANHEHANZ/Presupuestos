import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { TableColumn } from '../../../../shared/table/table.component';
import { FormConsultas } from './form.component';

@Component({
  selector: 'app-consultas',
  template: ` <app-wrapper
    title="Consultas"
    [path]="{
      initial: 'Modulos',
      finally: 'Consultas'
    }"
  >
    <app-form-consultas />
    <app-main-table
      [columns]="columns"
      [data]="[]"
      [rowExpandTemplate]="expandTemplate"
      title="Listado de unidades ejecutoras"
      [searchConfig]="{
          label : 'Filtrar',
          placeholder: 'Filtrar datos en la tabla ',
          buttonLabel: 'Filtrar',
          icon: 'filter',
        }"
      (limitChange)="onLimitChange($event)"
      [fetchPageData]="fetchPageData"
      (searchChange)="searchChange($event)"
    ></app-main-table>
    <ng-template #expandTemplate let-row>
      <div></div>
    </ng-template>
  </app-wrapper>`,
  imports: [
    WrapperComponent,
    ReactiveFormsModule,
    MainTableComponent,
    FormConsultas,
  ],
})
export class ConsultasComponent {
  columns: TableColumn<any>[] = [
    { header: 'UE', accessor: 'ue' },
    { header: 'Secretaría', accessor: 'secretaria' },
    { header: 'Descripción', accessor: 'descripcion' },
    { header: 'Estado', accessor: 'estado' },
  ];

  onLimitChange(newLimit: number) {
    // this.filter.limit = newLimit;
    // this.fetchPageData(1);
  }
  fetchPageData = async (
    page: number
  ): Promise<{ data: any[]; totalPages: number }> => {
    return {
      data: [],
      totalPages: 1,
    };
  };
  searchChange(query: string) {
    console.log('Search query:', query);
    // puedes aplicar lógica de filtrado aquí si necesitas
  }
}

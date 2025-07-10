import { Component } from '@angular/core';
import { WrapperComponent } from '../../../../shared/container/wrapper.component';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { MainTableComponent } from '../../../../shared/table/main.table.component';
import { TableColumn } from '../../../../shared/table/table.component';

@Component({
  selector: 'app-consultas',
  template: ` <app-wrapper
    title="Consultas"
    [path]="{
      initial: 'Modulos',
      finally: 'Consultas'
    }"
  >
    <app-container [title]="'Formulario de consultas'" class="">
      <form class="grid grid-cols-4 gap-4 " [formGroup]="form">
        <app-custom-input label="Cat Prog" />
        <app-custom-input label="FTE" />
        <app-custom-input label="Objetivo" class="col-span-2" />
        <app-custom-input label="Description" class="col-span-2" />
        <app-custom-input label="Org" />
        <app-custom-input label="Description gasto" />
        <div class="grid grid-cols-[1fr_50px_1fr] w-full col-span-full">
          <p class="col-span-full text-primary font-semibold text-sm ml-3">
            Presupuesto Vigente
          </p>
          <app-custom-input class="" />
          <app-custom-select [items]="options" formControlName="operador" />
          <app-custom-input class="" />
        </div>
        <div class="col-span-full flex justify-end items-center  gap-4 mt-6">
          <app-custom-button variant="secondary" icon="clearFilter"
            >Limpiar filtro</app-custom-button
          >
          <app-custom-button icon="filter">Filtrar</app-custom-button>
        </div>
      </form>
    </app-container>
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
    ContainerComponent,
    CustomInputComponent,
    CustomSelectComponent,
    ReactiveFormsModule,
    CustomButtonComponent,
    MainTableComponent,
  ],
})
export class ConsultasComponent {
  form = new FormGroup({
    operador: new FormControl('IGUAL'),
  });

  options = [
    { label: '=', value: 'IGUAL' },
    { label: '>', value: 'MAYOR_QUE' },
    { label: '<', value: 'MENOR_QUE' },
  ];

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

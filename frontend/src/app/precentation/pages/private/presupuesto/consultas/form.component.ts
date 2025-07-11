import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-consultas',
  template: `
    <app-container [title]="'Formulario de consultas'" class="">
      <form class="grid grid-cols-5 gap-4 " [formGroup]="form">
        <section class="col-span-4  grid grid-cols-4 gap-4">
          <app-custom-select
            label="Tipo de gasto"
            formControlName="tipoGasto"
          />
          <app-custom-select label="DA" formControlName="da" />
          <app-custom-input label="FTE" formControlName="fte" />
          <app-custom-input label="Cat Prog" formControlName="catProg" />

          <div
            class="col-span-2 border border-dashed border-violet-300 grid grid-cols-2 gap-2 rounded-lg p-4 bg-violet-50/30"
          >
            <p class="col-span-full text-sm text-primary font-semibold">UE</p>
            <app-custom-input label="Desde" formControlName="ueDesde" />
            <app-custom-input label="Hasta" formControlName="ueHasta" />
          </div>
          <div
            class="col-span-2 border border-dashed border-violet-300 grid grid-cols-2 gap-2 rounded-lg p-4 bg-violet-50/30"
          >
            <p class="col-span-full text-sm text-primary font-semibold">ORG</p>

            <app-custom-input label="Desde" formControlName="orgDesde" />
            <app-custom-input label="Hasta" formControlName="orgHasta" />
          </div>
          <app-custom-input
            label="Objetivo"
            class="col-span-2"
            formControlName="objetivo"
          />
          <app-custom-input
            label="Description"
            class="col-span-2"
            formControlName="descripcion"
          />
          <app-custom-input label="Org" formControlName="org" />
          <app-custom-input
            label="Description gasto"
            formControlName="descripcionGasto"
          />
          <div class="grid grid-cols-[50px_1fr] w-full col-span-2">
            <p class="col-span-full text-primary font-semibold text-sm ml-3">
              Presupuesto Vigente
            </p>
            <app-custom-select [items]="options" formControlName="operador" />
            <app-custom-input
              class=""
              formControlName="presupuestoVigenteComparar"
            />
          </div>
        </section>
        <section>
          <p class="text-primary font-semibold text-sm mb-1">Periodo</p>
          <p-datePicker
            class="w-full flex justify-center items-center "
            formControlName="periodo"
            selectionMode="range"
            inputId="dateRange"
            [inline]="true"
            dateFormat="dd/mm/yy"
            placeholder="Seleccione un rango de fechas"
          ></p-datePicker>
          <p class="py-4 text-sm font-semibold text-primary">Escogiste :</p>
          <div class="flex gap-2 justify-center items-center text-center">
            @let range = form.get('periodo')?.value; @if (range?.length === 2) {
            <p class="flex flex-col gap-2 justify-center items-center px-4">
              <samp class="text-2xl">{{ range![0] | date : 'dd' }}</samp>
              <span>de {{ range![0] | date : 'MMMM' }}</span>
            </p>
            <span class="h-full px-2">al</span>
            <p class="flex flex-col gap-2 justify-center items-center px-4">
              <samp class="text-2xl">{{ range![1] | date : 'dd' }}</samp>
              <span>de {{ range![1] | date : 'MMMM' }}</span>
            </p>
            } @else {
            <p
              class="text-sm text-primary border border-dashed h-full min-h-14 w-full grid content-center text-center rounded-lg bg-slate-50"
            >
              Escoge un rango de fechas
            </p>
            }
          </div>
        </section>
        <div class="col-span-full flex justify-end items-center  gap-4 mt-6">
          <app-custom-button
            variant="secondary"
            icon="clearFilter"
            (btnClick)="clearFormFilter()"
            >Limpiar filtro</app-custom-button
          >
          <app-custom-button icon="filter" (btnClick)="submitFilter()"
            >Filtrar</app-custom-button
          >
        </div>
      </form>
      <div
        class="text-sm  mt-4 border border-violet-200 items-center bg-violet-50 p-4 rounded-xl flex gap-4 text-violet-600"
      >
        <app-icon [name]="'warning'" />
        <p>
          Utiliza los campos disponibles para aplicar filtros personalizados a
          tu consulta. Puedes rellenar uno o varios campos según la información
          que desees buscar. <br />
          Para comparar el presupuesto vigente, selecciona el operador adecuado
          (=, > o <)
        </p>
      </div>
    </app-container>
  `,
  imports: [
    ContainerComponent,
    CustomInputComponent,
    CustomSelectComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
    IconComponent,
    CommonModule,
    DatePickerModule,
  ],
})
export class FormConsultas {
  form = new FormGroup({
    tipoGasto: new FormControl(''),
    da: new FormControl(''),
    fte: new FormControl(''),
    catProg: new FormControl(''),
    ueDesde: new FormControl(''),
    ueHasta: new FormControl(''),
    orgDesde: new FormControl(''),
    orgHasta: new FormControl(''),
    objetivo: new FormControl(''),
    descripcion: new FormControl(''),
    org: new FormControl(''),
    descripcionGasto: new FormControl(''),
    operador: new FormControl('IGUAL'),
    presupuestoVigenteComparar: new FormControl(''),
    periodo: new FormControl<Date[] | null>(null),
  });

  options = [
    { label: '=', value: 'IGUAL' },
    { label: '>', value: 'MAYOR_QUE' },
    { label: '<', value: 'MENOR_QUE' },
  ];
  submitFilter() {
    console.log(this.form.value);
  }
  clearFormFilter() {
    this.form.reset({
      operador: 'IGUAL',
    });
  }
}

import { Component } from '@angular/core';
import { ContainerComponent } from '../../../../shared/container/container.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { CustomSelectComponent } from '../../../../shared/select/select.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-consultas',
  template: `
    <app-container [title]="'Formulario de consultas'" class="">
      <form class="grid grid-cols-4 gap-4 " [formGroup]="form">
        <app-custom-input label="Cat Prog" formControlName="catProg" />
        <app-custom-input label="FTE" formControlName="fte" />
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
        <div class="grid grid-cols-[1fr_50px_1fr] w-full col-span-full">
          <p class="col-span-full text-primary font-semibold text-sm ml-3">
            Presupuesto Vigente
          </p>
          <app-custom-input class="" formControlName="presupuestoVigenteBase" />
          <app-custom-select [items]="options" formControlName="operador" />
          <app-custom-input
            class=""
            formControlName="presupuestoVigenteComparar"
          />
        </div>
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
    </app-container>
  `,
  imports: [
    ContainerComponent,
    CustomInputComponent,
    CustomSelectComponent,
    CustomButtonComponent,
    ReactiveFormsModule,
  ],
})
export class FormConsultas {
  form = new FormGroup({
    operador: new FormControl('IGUAL'),
    catProg: new FormControl(''),
    fte: new FormControl(''),
    objetivo: new FormControl(''),
    descripcion: new FormControl(''),
    org: new FormControl(''),
    descripcionGasto: new FormControl(''),
    presupuestoVigenteBase: new FormControl(''),
    presupuestoVigenteComparar: new FormControl(''),
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

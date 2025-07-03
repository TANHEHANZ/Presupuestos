import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../../../../shared/calendar/calendar.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { IconComponent } from '../../../../shared/icons/icon.component';

@Component({
  selector: 'programacion-mensual',
  template: `<div class="  w-[75dvw]">
    <section [formGroup]="userForm">
      <p
        class="p-4 border border-violet-200 rounded-lg bg-violet-50 text-violet-800  flex gap-2"
      >
        <app-icon name="alert" /> Estas por realizar la programacion mensual ,
        ten encuenta que esto debes realizar solo una vez
      </p>
      <article class="grid grid-cols-4 my-4 gap-2">
        <app-custom-input
          label="Categoria Programada"
          formControlName="catPrg"
        />
        <app-custom-input label="FTE" formControlName="fte" />
        <app-custom-input label="Objeto" formControlName="objeto" />
        <app-custom-input label="Descripción" formControlName="descripcion" />
        <app-custom-input label="Org" formControlName="org" />
        <app-custom-input
          label="Descripcion de gastos"
          class="col-span-3"
          formControlName="descripcionGasto"
        />
        <app-custom-input
          label="Presupuesto Vigente"
          formControlName="pre_Vigente"
        />
        <app-custom-input
          label="Presupuesto Programado"
          formControlName="pre_Programado"
        />
      </article>

      <app-calendar
        [meses]="v_meses"
        [loading]="isLoading"
        [mode]="'form'"
        (select)="onMesSeleccionado($event)"
        class="w-full"
      />

      <nav class="flex justify-end ">
        <app-custom-button [icon]="'calendar'" (btnClick)="saveBudgets()">
          Realizar Programación
        </app-custom-button>
      </nav>
    </section>
  </div>`,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarComponent,
    CustomButtonComponent,
    CustomInputComponent,
    IconComponent,
  ],
})
export class ProgramacionMensual {
  D_Presupuesto = input<any>();

  userForm!: FormGroup;
  ngOnInit(): void {
    const data = this.D_Presupuesto();
    console.log(data);
    this.userForm = new FormGroup({
      catPrg: new FormControl({ value: data?.catPrg ?? '', disabled: true }),
      fte: new FormControl({ value: data?.fte ?? '', disabled: true }),
      objeto: new FormControl({
        value: data?.objetoGasto ?? '',
        disabled: true,
      }),
      descripcion: new FormControl({
        value: data?.descripcion ?? '',
        disabled: true,
      }),
      org: new FormControl({ value: data?.org ?? '', disabled: true }),
      descripcionGasto: new FormControl({
        value: data?.descripcionGasto ?? '',
        disabled: true,
      }),
      pre_Vigente: new FormControl({
        value: data?.presupuestoVigente ?? '',
        disabled: true,
      }),
      pre_Programado: new FormControl({
        value: data?.pre_Programado ?? '',
        disabled: true,
      }),
    });
  }
  saveBudgets() {}

  isLoading = false;
  v_meses = [
    { mes: 'Ene', value: '0' },
    { mes: 'Feb', value: '0' },
    { mes: 'Mar', value: '0' },
    { mes: 'Abr', value: '0' },
    { mes: 'May', value: '0' },
    { mes: 'Jun', value: '0' },
    { mes: 'Jul', value: '0' },
    { mes: 'Ago', value: '0' },
    { mes: 'Sep', value: '0' },
    { mes: 'Oct', value: '0' },
    { mes: 'Nov', value: '100000000000' },
    { mes: 'Dic', value: '0' },
  ];
  onMesSeleccionado(index: number) {
    const mesSeleccionado = this.v_meses[index];
    console.log('Mes seleccionado:', mesSeleccionado);

    this.userForm.get('pre_Programado')?.enable();
    // Aquí puedes guardar el mes o marcarlo como seleccionado, etc.
  }
}

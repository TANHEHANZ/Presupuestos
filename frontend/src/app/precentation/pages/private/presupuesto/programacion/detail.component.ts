import { Component, input, OnInit } from '@angular/core';
import { CalendarComponent } from '../../../../shared/calendar/calendar.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'detail-presupuesto',
  standalone: true,
  template: `
    <section [formGroup]="userForm">
      <article class="grid grid-cols-5 my-4 gap-2">
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
          class="col-span-2"
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

      <app-calendar></app-calendar>
    </section>
  `,
  imports: [CalendarComponent, CustomInputComponent, ReactiveFormsModule],
})
export class DetailComponent implements OnInit {
  D_Presupuesto = input<any>();

  userForm!: FormGroup;

  ngOnInit(): void {
    const data = this.D_Presupuesto();

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
}

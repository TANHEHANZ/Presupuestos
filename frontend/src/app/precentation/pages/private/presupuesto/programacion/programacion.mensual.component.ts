import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../../../../shared/calendar/calendar.component';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { IconComponent } from '../../../../shared/icons/icon.component';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';

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
          class=" col-span-2"
          [type]="'number'"
        />
        <section class="self-end">
          <app-custom-button
            [icon]="'calendar'"
            variant="secondary"
            (btnClick)="saveBudgetsMonth()"
          >
            Agregar Programacion
          </app-custom-button>
        </section>
      </article>

      <app-calendar
        [meses]="programacionMensual"
        [currentMonth]="D_Presupuesto().currentMonth"
        [lastMonth]="D_Presupuesto().lastMonth"
        [presupuestoVigente]="D_Presupuesto().presupuestoVigente"
        [totalAsignado]="D_Presupuesto().presupuestoProgramado"
        [mode]="'form'"
        (select)="onMesSeleccionado($event)"
        class="w-full"
      />

      <nav class="flex justify-end ">
        <app-custom-button [icon]="'calendar'" (btnClick)="onSaveBudgests()">
          Guardar toda la programacion
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
  toastS = inject(ToastService);
  programacionMensual = [];

  D_Presupuesto = input<any>();
  selectedMesIndex: number | null = null;

  userForm!: FormGroup;
  ngOnInit(): void {
    const data = this.D_Presupuesto();
    console.log(data);
    this.programacionMensual = data.programacion;
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
  saveBudgetsMonth() {
    const MONTO_ASIGNADO = this.getTotalAsignado();
    const MONTO_PROGRAMADO =
      Number(this.userForm.get('pre_Programado')?.value) || 0;
    const MONTO_VIGENTE = Number(this.userForm.get('pre_Vigente')?.value) || 0;

    if (MONTO_ASIGNADO + MONTO_PROGRAMADO > MONTO_VIGENTE) {
      this.toastS.addToast({
        title: 'Monto excede al vigente',
        type: 'error',
        description: 'Estas excediendo el monto que tienes para presupuestar',
      });
      return;
    }

    if (this.selectedMesIndex === null || MONTO_PROGRAMADO === 0) return;

    this.userForm.get('pre_Programado')?.disable();
  }

  mesSeleccionado = {};
  isLoading = false;
  readonly currentMonth = new Date().getMonth() - 1;

  onMesSeleccionado(event: { index: number; value: number }) {
    console.log('Mes seleccionado:', event.index, 'Valor:', event.value);
    // Aquí puedes manejar el cambio, guardar, mostrar modal, etc.
  }

  getTotalAsignado(): number {
    return 0;
  }
  onSaveBudgests() {
    const data = {
      idPresupuesto: this.D_Presupuesto().id,
      programacion: '',
    };
    console.log(data);
  }
}

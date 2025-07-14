import { CommonModule } from '@angular/common';
import { Component, inject, input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../../../shared/calendar/calendar.component';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import { CustomInputComponent } from '../../../shared/input/input.component';
import { IconComponent } from '../../../shared/icons/icon.component';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { ProgramationService } from '../../../../infraestructure/services/apis/programation.service';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';

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
          #programadoInput
          id="pre_Programado"
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
        [totalAsignado]="TOTAL_ASIGNADO"
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
  modalS = inject(PanelService);
  programacionMensual: {
    mes: string;
    value: string | number;
    asignado?: boolean;
    version: number;
    updatedAt: string;
    pasado?: boolean;
  }[] = [];
  @ViewChild('programadoInput') programadoInputRef!: CustomInputComponent;
  D_Presupuesto = input<any>();
  selectedMesIndex: number | null = null;
  TOTAL_ASIGNADO = 0;
  mesSeleccionado = {};
  isLoading = false;
  programationS = inject(ProgramationService);
  readonly currentMonth = new Date().getMonth() - 1;
  userForm!: FormGroup;
  ngOnInit(): void {
    const data = this.D_Presupuesto();

    console.log(data);
    this.programacionMensual = data.programacion;
    this.TOTAL_ASIGNADO = this.getTotalAsignado();
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
    if (this.selectedMesIndex === null) return;

    const MONTO_PROGRAMADO =
      Number(this.userForm.get('pre_Programado')?.value) || 0;
    const MONTO_ASIGNADO = this.getTotalAsignado(this.selectedMesIndex); // ← excluye el mes actual
    const MONTO_VIGENTE = Number(this.userForm.get('pre_Vigente')?.value) || 0;

    if (MONTO_PROGRAMADO < 0) return;

    if (MONTO_ASIGNADO + MONTO_PROGRAMADO > MONTO_VIGENTE) {
      this.toastS.addToast({
        title: 'Monto excede al vigente',
        type: 'error',
        description: 'Estas excediendo el monto que tienes para presupuestar',
      });
      return;
    }

    this.programacionMensual[this.selectedMesIndex].value = MONTO_PROGRAMADO;
    this.programacionMensual = [...this.programacionMensual];

    this.userForm.get('pre_Programado')?.disable();

    // Recalcular el TOTAL_ASIGNADO incluyendo ahora el nuevo valor
    this.TOTAL_ASIGNADO = this.getTotalAsignado();
  }

  onMesSeleccionado(event: { index: number; value: number }) {
    const mesSeleccionado = event.index;
    const mesActual = new Date().getMonth() - 1;
    if (mesSeleccionado < mesActual) {
      this.userForm.get('pre_Programado')?.disable();
      this.userForm.get('pre_Programado')?.setValue(0);

      return;
    }
    this.selectedMesIndex = mesSeleccionado;

    this.userForm.get('pre_Programado')?.enable();
    this.userForm.get('pre_Programado')?.setValue(event.value);
    setTimeout(() => {
      this.programadoInputRef?.focusInput();
    });
  }

  getTotalAsignado(excludeIndex?: number): number {
    return this.programacionMensual.reduce((acc, mes, index) => {
      if (index === excludeIndex) return acc;

      const valor =
        typeof mes.value === 'number' ? mes.value : Number(mes.value);
      return acc + (isNaN(valor) ? 0 : valor);
    }, 0);
  }

  onSaveBudgests() {
    const data = {
      idPresupuesto: this.D_Presupuesto().id as string,
      programacion: this.programacionMensual.map((mes) => ({
        mes: mes.mes,
        value: Number(mes.value || 0),
      })),
    };
    this.programationS.crate(data).subscribe({
      next: (value) => {
        console.log('Programación guardada:', value);
        this.toastS.addToast({
          title: 'Programación guardada',
          description: 'La programación mensual se ha guardado correctamente',
          id: 'programacion-success',
          type: 'success',
        });
        this.modalS.closeModal(true);
      },
      error: (e) => {
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          description: message,
          id: 'user-save-error',
          type: 'error',
        });
      },
    });
  }
}

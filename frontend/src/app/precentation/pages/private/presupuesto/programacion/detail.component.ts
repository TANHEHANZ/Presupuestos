import { Component, inject, input, OnInit } from '@angular/core';
import { CalendarComponent } from '../../../../shared/calendar/calendar.component';
import { CustomInputComponent } from '../../../../shared/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { ProgramacionMensual } from './programacion.mensual.component';
import { CommonModule } from '@angular/common';
import { PanelService } from '../../../../../infraestructure/services/components/panel.service';

@Component({
  selector: 'detail-presupuesto',
  standalone: true,
  template: `
    <app-modal title="Programacion Mensual">
      <ng-container *ngIf="visible">
        <programacion-mensual [D_Presupuesto]="D_Presupuesto()" />
      </ng-container>
    </app-modal>
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

      <app-calendar [meses]="v_meses" />
      <nav class="flex justify-end ">
        <app-custom-button [icon]="'calendar'" (btnClick)="onBudgets()">
          Realizar Programación
        </app-custom-button>
      </nav>
    </section>
  `,
  imports: [
    CalendarComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CustomButtonComponent,
    CommonModule,
    ModalComponent,
    ProgramacionMensual,
  ],
})
export class DetailComponent implements OnInit {
  D_Presupuesto = input<any>();
  panelS = inject(PanelService);

  visible: boolean = false;
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
  onBudgets() {
    this.visible = true;
    this.panelS.openModal();
  }

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
}

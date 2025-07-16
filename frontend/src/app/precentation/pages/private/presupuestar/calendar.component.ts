import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DTO_Pre_CalendarR } from '../../../../infraestructure/models/presupuestos/filters/m_calendar';
import { PresupuestoService } from '../../../../infraestructure/services/apis/presupuesto.service';
import { ContainerComponent } from '../../../shared/container/container.component';

@Component({
  selector: 'app-calendar-component',
  standalone: true,
  template: `
    <app-container title="Calendario">
      <section class="grid grid-cols-12 gap-2 w-[70dvw] mx-auto  ">
        @for (item of valueCalendar?.meses; track $index; let i = $index) {
        <div
          class="p-6 flex justify-center border transition-all items-center flex-col rounded-lg relative group bg-white"
          [ngClass]="getMonthClasses(item, i)"
          (click)="onSelectMonth(i)"
        >
          <p>{{ item.mes.slice(0, 3) }}</p>
          @if (selectedIndex === i ) {
          <div
            class="absolute -top-10  transform  bg-olther text-white border  px-2 py-1 rounded-3xl  min-w-48 z-50 flex flex-col items-center animate-fade-in"
          >
            <div
              class="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-olther"
            ></div>

            <p class="text-[8px] font-medium uppercase tracking-wide">
              {{ item.mes }}
            </p>
            <p class="text-sm font-semibold tracking-tight">
              {{ item.value }}
            </p>
          </div>

          }
        </div>
        } @empty {
        <div>No se pudo obtener el calendario de meses</div>
        }
        <div class="flex  col-span-full flex-col mt-2">
          <p class="text-4xl">{{ valueCalendar?.TotalAsignado }}</p>
          <p>Monto total presupuestado</p>
        </div>
      </section>
    </app-container>
  `,
  imports: [CommonModule, ContainerComponent],
})
export class CalendarComponent implements OnInit {
  selectedIndex: number | null = null;
  calendarS = inject(PresupuestoService);
  valueCalendar: DTO_Pre_CalendarR | null = null;
  ngOnInit(): void {
    this.calendarS.calendar().subscribe({
      next: (value) => {
        this.valueCalendar = value;
        console.log(value);
        console.log(this.valueCalendar);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onSelectMonth(index: number) {
    this.selectedIndex = index;
  }

  getMonthClasses(item: any, i: number) {
    return {
      'scale-110': this.selectedIndex === i,
      'cursor-pointer text-center hover:scale-110': true,
      'bg-primary/50 text-white':
        item.version >= 1 && item.pasado && item.value > 0,
      'bg-primary text-white  ': item.version >= 1 && item.value > 0,
      'bg-gray-200 text-gray-500  text-black':
        item.version === 1 && item.pasado,
      'bg-gray-100 text-gray-500': !item.asignado && item.pasado,
    };
  }
}

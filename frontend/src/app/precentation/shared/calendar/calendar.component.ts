import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../container/container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ContainerComponent, CommonModule, FormsModule],
  template: `
    <app-container [title]="'Programación'" class="w-full">
      <ng-container *ngIf="!loading; else cargando">
        <section
          class="flex flex-row gap-4 justify-center items-center h-full "
        >
          <article
            class="flex justify-center items-center flex-col gap-2 flex-1  min-h-[32dvh]  relative "
          >
            <section class="grid grid-cols-12 gap-2  ">
              @for (item of meses; track $index; let i = $index) {
              <div
                class="p-6 flex justify-center border transition-all items-center flex-col rounded-lg relative group"
                [ngClass]="getMonthClasses(item, i)"
                (click)="onSelectMonth(i)"
              >
                <p>{{ item.mes.slice(0, 3) }}</p>
                @if (selectedIndex === i ) {
                <div
                  class="absolute -top-14  transform  bg-olther text-white border  px-2 py-1 rounded-3xl  min-w-48 z-50 flex flex-col items-center animate-fade-in"
                >
                  <div
                    class="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-olther"
                  ></div>

                  <p class="text-xs font-medium uppercase tracking-wide">
                    {{ item.mes }}
                  </p>
                  <p class="text-xl font-semibold tracking-tight">
                    {{ item.value }}
                  </p>
                </div>

                }
              </div>
              } @empty {
              <div>No se pudo obtener el calendario de meses</div>
              }
            </section>
            <div
              class="absolute bottom-0 left-0 right-0  p-4 flex gap-4 justify-between items-center bg-white "
            >
              <div class="uppercase flex gap-2  divide-x divide-gray-300">
                <p class="flex flex-col  items-center px-8">
                  <span class="text-5xl font-light">
                    {{ presupuestoVigente }}</span
                  >
                  <span class="text-xs"> vigente: </span>
                </p>
                <p class="flex flex-col  items-center px-8">
                  <span class="text-5xl font-light"> {{ totalAsignado }}</span>
                  <span class="text-xs">Total asignado</span>
                </p>
              </div>
              <span class="text-xs self-end"
                >Modificaciones realizadas: {{ meses[0].version }}</span
              >
            </div>
          </article>
          <section class="max-h-[35dvh] overflow-y-auto ">
            <table>
              <thead class="bg-slate-100 sticky top-0">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mes
                  </th>

                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    valor
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (item of meses; track $index; let i = $index) {
                <tr
                  class="cursor-pointer hover:bg-slate-50"
                  (click)="onSelectMonth(i)"
                >
                  <td class="px-6 py-2 whitespace-nowrap text-sm">
                    {{ item.mes }}
                  </td>
                  <td class="px-6 py-2 whitespace-nowrap text-sm">
                    {{ item.value }}
                  </td>
                </tr>
                }
              </tbody>
            </table>
          </section>
        </section>
      </ng-container>

      <ng-template #cargando>
        <div class="text-center py-10 ">Cargando calendario...</div>
      </ng-template>
    </app-container>
  `,
})
export class CalendarComponent implements OnInit {
  @Input() meses: {
    mes: string;
    value: string | number;
    asignado?: boolean;
    version: number;
    updatedAt: string;
    pasado?: boolean;
  }[] = [];

  @Input() presupuestoVigente: number = 0;
  @Input() totalAsignado: number = 0;
  @Input() lastMonth: number = 0;
  @Input() currentMonth: number = 1;
  @Input() loading: string = '';
  @Input() mode: 'readonly' | 'form' = 'readonly';

  @Output() select = new EventEmitter<{ index: number; value: number }>();

  selectedIndex: number | null = null;
  editValue: number = 0;

  ngOnInit(): void {
    const currentMonth = new Date().getMonth();
    this.meses = this.meses.map((m, i) => ({
      ...m,
      pasado: i < currentMonth,
    }));
  }

  onSelectMonth(index: number) {
    if (this.currentMonth < index + 1) {
      return;
    }
    const mes = this.meses[index];
    this.selectedIndex = index;
    this.editValue = Number(mes.value);
    this.select.emit({ index, value: this.editValue });
  }

  updateValue(index: number) {
    this.meses[index].value = this.editValue;
    this.select.emit({ index, value: this.editValue });
  }

  getMonthClasses(item: any, i: number) {
    return {
      'scale-110': this.selectedIndex === i,
      'cursor-pointer text-center hover:scale-110': true,
      'bg-primary/50 text-white':
        item.version >= 1 && item.pasado && item.value > 0,
      'bg-primary text-white  ': item.version >= 1 && item.value > 0, // esto significa que en un punto se asignó
      'bg-gray-200 text-gray-500  text-black':
        item.version === 1 && item.pasado, // Asignado pero no pasado

      // Pasado pero no asignado
      'bg-gray-100 text-gray-500': !item.asignado && item.pasado,
    };
  }
}

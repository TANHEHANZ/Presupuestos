import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../container/container.component';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ContainerComponent, IconComponent, CommonModule],
  template: `
    <app-container [title]="'Programación'" class="w-full">
      <ng-container *ngIf="!loading; else cargando">
        <article class="flex justify-center items-center flex-col gap-2">
          <article class="flex gap-4">
            <div class="flex gap-2 justify-center items-center">
              <div>
                <p class="text-sm">Gestión</p>
                <p class="text-3xl">2025</p>
              </div>
              <div
                class="flex px-4 divide-x divide-slate-200 h-full justify-center items-center"
              >
                <app-icon name="left" class="px-2" />
                <app-icon name="right" class="px-2" />
              </div>
            </div>

            <section class="grid grid-cols-12 gap-2 flex-1 mb-8">
              @for (item of meses; track $index; let i = $index) {
              <div
                (click)="onSelectMonth(i)"
                class="p-4 flex justify-center border transition-all items-center flex-col rounded-lg"
                [ngClass]="getMonthClasses(item, i)"
              >
                <p class="">{{ item.mes.slice(0, 3) }}</p>
              </div>
              } @empty {
              <div>No se pudo obtener el calendario de meses</div>
              }
            </section>
          </article>

          @if (selectedIndex !== null) {
          <section
            class="self-start border border-dashed p-4 rounded-xl w-full flex flex-col cursor-not-allowed"
          >
            <p
              class="px-4 py-2 uppercase bg-primary/10 rounded-xl text-[10px] self-start"
            >
              Visualización de presupuesto asignado
            </p>
            <p>{{ selectedMes }}</p>
            <p class="text-2xl font-normal">{{ selectedMesValue }}</p>
          </section>
          }
        </article>
        <p class=" uppercase flex flex-col my-2">
          <span class="text-xs"
            >presupuesto vigente : {{ presupuestoVigente }}</span
          >
          <span class="text-xs">Total asignado : {{ totalAsignado }}</span>
        </p>
      </ng-container>

      <ng-template #cargando>
        <div class="text-center py-10">Cargando calendario...</div>
      </ng-template>
    </app-container>
  `,
})
export class CalendarComponent {
  @Input() meses: {
    mes: string;
    value: string | number;
    asignado?: boolean;
    pasado?: boolean;
  }[] = [];
  @Input() presupuestoVigente: number = 0;
  @Input() totalAsignado: number = 0;

  @Input() loading: boolean = false;
  @Input() mode: 'readonly' | 'form' = 'readonly';

  @Output() select = new EventEmitter<number>();

  selectedIndex: number | null = null;
  selectedMes: string = '';
  selectedMesValue: string | number = '';

  onSelectMonth(index: number) {
    if (this.mode !== 'form') return;
    const mes = this.meses[index];
    if (mes.pasado) return;

    this.selectedIndex = index;
    this.selectedMes = mes.mes;
    this.selectedMesValue = mes.value;
    this.select.emit(index);
  }

  getMonthClasses(item: any, i: number) {
    return {
      'text-white bg-primary': item.asignado && !item.pasado,
      'bg-primary/80 text-white ring-2 ring-primary':
        item.asignado && item.pasado,
      'opacity-60 bg-gray-100 cursor-not-allowed text-center': item.pasado,
      'border-primary text-center hover:scale-110 cursor-pointer':
        this.mode === 'form' && !item.pasado,
      'scale-110': this.selectedIndex === i,
    };
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { IconComponent } from '../icons/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ContainerComponent, IconComponent, CommonModule],
  template: `
    <app-container [title]="'Programación'" class="w-full">
      <ng-container *ngIf="!loading; else cargando">
        <article class="">
          <!-- <div class="flex gap-2 justify-center items-center">
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
          </div> -->

          <section class="grid grid-cols-12 gap-2 flex-1">
            @for (item of meses; track $index; let i = $index) {
            <div
              (click)="onSelectMonth(i)"
              class="p-4 flex justify-center border transition-all delay-100 items-center flex-col rounded-lg"
              [ngClass]="{
                'border-primary text-center hover:scale-110 cursor-pointer':
                  mode === 'form' && !item.usado,
                'text-center opacity-50 bg-gray-100 cursor-not-allowed':
                  item.usado,
                'col-span-1': selectedIndex === i,
                'ring-2 ring-primary': selectedIndex === i && mode === 'form'
              }"
            >
              <p>{{ item.mes }}</p>
              <p>{{ item.value }}</p>
            </div>
            } @empty {
            <div>No se pudo obtener el calendario de meses</div>
            }
          </section>
        </article>
      </ng-container>

      <ng-template #cargando>
        <div class="text-center py-10">Cargando calendario...</div>
      </ng-template>
    </app-container>
  `,
})
export class CalendarComponent {
  @Input() meses: { mes: string; value: string | number; usado?: boolean }[] =
    [];
  @Input() loading: boolean = false;

  @Input() mode: 'readonly' | 'form' = 'readonly';
  @Output() select = new EventEmitter<number>();

  selectedIndex: number | null = null;

  onSelectMonth(index: number) {
    if (this.mode !== 'form') return;
    const mes = this.meses[index];
    if (mes.usado) return;

    this.selectedIndex = index;
    this.select.emit(index);
  }
}

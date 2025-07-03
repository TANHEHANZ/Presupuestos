import { Component } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { IconComponent } from '../icons/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  template: `
    <app-container [title]="'Programación'">
      <article class=" flex gap-4 ">
        <div class="flex gap-2 justify-center items-center">
          <div>
            <p class="text-sm">gestion</p>
            <p class="text-3xl">2025</p>
          </div>
          <div
            class="flex  px-4 divide-x divide-slate-200 h-full justify-center items-center"
          >
            <app-icon name="left" class="px-2" />
            <app-icon name="right" class="px-2" />
          </div>
        </div>
        <section class="grid grid-cols-12 gap-2 flex-1">
          @for (item of v_meses; track $index) {
          <div
            class="p-4 flex justify-center border transition-all delay-100 items-center flex-col rounded-lg "
            [ngClass]="{
              'border-olther  text-center hover:scale-110 cursor-pointer':
                item.value !== '0',
              'text-center  opacity-70': item.value === '0'
            }"
          >
            <p>{{ item.mes }}</p>
            <p class="">{{ item.value }}</p>
          </div>

          } @empty {
          <div>No se pudo obtener el calendario de meses</div>
          }
        </section>
      </article>
    </app-container>
  `,
  imports: [ContainerComponent, IconComponent, CommonModule],
  standalone: true,
})
export class CalendarComponent {
  v_meses = [
    { mes: 'Ene', value: '0' },
    { mes: 'Feb', value: '0' },
    { mes: 'Mar', value: '0' },
    { mes: 'Abr', value: '0' },
    { mes: 'May', value: '0' },
    { mes: 'Jun', value: '175500' },
    { mes: 'Jul', value: '185000' },
    { mes: 'Agos', value: '0' },
    { mes: 'Sep', value: '0' },
    { mes: 'Oct', value: '0' },
    { mes: 'Nov', value: '0' },
    { mes: 'Dic', value: '0' },
  ];
}

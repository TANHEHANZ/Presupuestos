import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icons/icon.component';

@Component({
  selector: 'app-calendar-component',
  standalone: true,
  template: `
    <section class="grid grid-cols-12 gap-4 h-[5dvh] w-full">
      @for (updated of items; let i = $index; track $index) {
      <div
        class="rounded-xl p-2 flex justify-center items-center relative"
        [ngClass]="updated ? 'bg-olther text-white *:' : 'bg-gray-300'"
      >
        <p>{{ months[i] }}</p>
      </div>
      }
    </section>
  `,
  imports: [CommonModule, IconComponent],
})
export class CalendarComponent {
  items = [
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
  ];

  months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
@Component({
  selector: 'app-container',
  template: `
    <section
      class=".container bg-white rounded-lg p-8 flex flex-col gap-2 overflow-hidden"
      [ngStyle]="{ height: h, width: w }"
    >
      <p
        class="text-[9px] uppercase bg-olther/15 text-olther font-semibold self-start px-2 py-1 rounded-lg"
      >
        {{ title }}
      </p>
      <div>
        <ng-content></ng-content>
      </div>
    </section>
  `,
  imports: [CommonModule],
})
export class ContainerComponent {
  @Input() title: string = '';
  @Input() h: string = '100%';
  @Input() w: string = '100%';
}

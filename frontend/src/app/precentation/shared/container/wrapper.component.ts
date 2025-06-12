import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  imports: [],
  template: `
    <section class="flex flex-col gap-4">
      <article class="flex flex-col">
        <h1 class=" text-4xl uppercase font-medium">{{ title }}</h1>
        <div class="flex gap-1 uppercase ">
          <p class="text-xs">{{ path.initial }}</p>
          <samp class="text-xs">/</samp>
          <p class="text-xs">{{ path.finally }}</p>
        </div>
      </article>

      <ng-content></ng-content>
    </section>
  `,
})
export class WrapperComponent {
  @Input() title: string = '';
  @Input() path = {
    initial: '',
    finally: '',
  };
}

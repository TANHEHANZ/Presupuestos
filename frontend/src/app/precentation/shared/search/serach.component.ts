import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CustomInputComponent } from '../input/input.component';
import { CustomButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { IconName } from '../../../infraestructure/modules/presupuesto/types';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CustomInputComponent, CustomButtonComponent],
  template: `
    <form
      class="flex gap-4 justify-center items-end min-w-[32rem]"
      (submit)="onSubmit($event)"
    >
      <app-custom-input
        [label]="label"
        [type]="'search'"
        [placeholder]="placeholder"
        [(ngModel)]="search"
        name="search"
        (keyup.enter)="onSubmit($event)"
        class="w-full"
      ></app-custom-input>
      <app-custom-button type="submit" [icon]="icon">
        {{ buttonLabel }}
      </app-custom-button>
    </form>
  `,
})
export class SearchComponent {
  @Input() label = '';
  @Input() placeholder = 'Buscar...';
  @Input() buttonLabel = 'Buscar';
  @Input() icon: IconName = 'search';

  search = '';
  @Output() searchChange = new EventEmitter<string>();

  onSubmit(event: Event) {
    event.preventDefault();
    this.searchChange.emit(this.search.trim());
  }
}

import { Component, Input } from '@angular/core';
import { IconComponent, IconName } from '../icons/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      class="bg-primary text-white rounded-xl px-6 py-4 font-semibold transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <app-icon *ngIf="icon" [name]="icon"></app-icon>
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
  imports: [IconComponent, CommonModule],
})
export class CustomButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() icon?: IconName;
}

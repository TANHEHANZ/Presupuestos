import { Component, Input } from '@angular/core';
import { IconComponent, IconName } from '../icons/icon.component';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'olther';

@Component({
  selector: 'app-custom-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClass"
      class="font-semibold transition flex items-center gap-2"
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
  @Input() variant: ButtonVariant = 'primary';

  get buttonClass() {
    switch (this.variant) {
      case 'secondary':
        return 'bg-secondary/30 text-primary hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4';
      case 'olther':
        return 'bg-olther/10 text-olther hover:bg-olther/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4';

      case 'danger':
        return 'bg-danger/10 text-danger hover:bg-red-700/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4';
      case 'outline':
        return 'border border-primary text-primary bg-transparent hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4';
      default:
        return 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4';
    }
  }
}

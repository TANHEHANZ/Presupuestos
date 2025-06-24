import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelService } from '../../../infraestructure/services/components/panel.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="initialized"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black/40 transition-opacity duration-300"
      [class.opacity-0]="!isOpen"
      [class.pointer-events-none]="!isOpen"
      (click)="closeModal()"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 relative min-w-[300px] max-w-[70dvw] transform transition-transform duration-300 ease-in-out"
        [ngClass]="isOpen ? 'scale-100' : 'scale-90'"
        (click)="$event.stopPropagation()"
      >
        <p class="text-2xl font-normal mt-2 mb-4">{{ title }}</p>
        <button class="absolute top-4 right-6" (click)="closeModal()">✕</button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() title = '';
  s_panel = inject(PanelService);
  isOpen = false;
  initialized = false;
  constructor() {
    this.s_panel.modalState$.subscribe((state) => {
      this.isOpen = state;
      this.initialized = true;
    });
  }

  closeModal() {
    this.s_panel.closeModal();
  }
}

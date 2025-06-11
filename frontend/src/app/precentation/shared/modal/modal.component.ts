import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelService } from '../../../infraestructure/services/components/panel.service';
import gsap from 'gsap';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="s_panel.modalState$ | async"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      (click)="closeModal()"
    >
      <div
        class="
        bg-white rounded-lg shadow-lg p-6 relative min-w-[300px] max-w-xl "
        (click)="$event.stopPropagation()"
      >
        <button class="absolute top-4 right-6" (click)="closeModal()">✕</button>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  s_panel = inject(PanelService);

  openModal() {
    this.s_panel.openModal();
  }
  closeModal() {
    this.s_panel.closeModal();
  }
}

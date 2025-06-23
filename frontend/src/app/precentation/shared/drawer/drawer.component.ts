import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelService } from '../../../infraestructure/services/components/panel.service';
import { IconComponent } from '../icons/icon.component';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      *ngIf="initialized"
      class="fixed inset-0 z-20 bg-black/40 flex justify-end transition-opacity duration-300"
      [class.opacity-0]="!isOpen"
      [class.pointer-events-none]="!isOpen"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      (click)="closeDrawer()"
    >
      <aside
        class="bg-white z-10 h-full w-auto max-w-1/2 shadow-xl transition-transform duration-300 ease-in-out transform"
        [ngClass]="isOpen ? 'translate-x-0' : 'translate-x-full'"
        (click)="$event.stopPropagation()"
      >
        <header class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium my-4">{{ title }}</h2>
          <button
            class="text-2xl bg-secondary/30 text-primary w-8 h-8 rounded-lg flex justify-center items-center"
            (click)="closeDrawer()"
            aria-label="Cerrar drawer"
          >
            <app-icon name="close"></app-icon>
          </button>
        </header>
        <section class="p-8">
          <ng-content></ng-content>
        </section>
      </aside>
    </div>
  `,
})
export class DrawerComponent {
  @Input() title = '';
  panelService = inject(PanelService);
  isOpen = false;
  initialized = false;

  constructor() {
    this.panelService.drawerState$.subscribe((state) => {
      this.isOpen = state;
      this.initialized = true;
    });
  }

  closeDrawer() {
    this.panelService.closeDrawer();
  }
}

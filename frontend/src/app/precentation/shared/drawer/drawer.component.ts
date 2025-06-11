import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelService } from '../../../infraestructure/services/components/panel.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 bg-black/40 flex justify-end transition-opacity duration-300"
      [class.opacity-0]="!(panelService.drawerState$ | async)"
      [class.pointer-events-none]="!(panelService.drawerState$ | async)"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
      (click)="closeDrawer()"
    >
      <aside
        class="bg-white h-full w-[400px] max-w-full shadow-xl transition-transform duration-300 ease-in-out transform"
        [ngClass]="
          (panelService.drawerState$ | async)
            ? 'translate-x-0'
            : 'translate-x-full'
        "
        (click)="$event.stopPropagation()"
      >
        <header class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button
            class="text-2xl"
            (click)="closeDrawer()"
            aria-label="Cerrar drawer"
          >
            ×
          </button>
        </header>
        <section class="p-4">
          <ng-content></ng-content>
        </section>
      </aside>
    </div>
  `,
})
export class DrawerComponent {
  @Input() title = '';
  constructor(public panelService: PanelService) {}

  closeDrawer() {
    this.panelService.closeDrawer();
  }
}

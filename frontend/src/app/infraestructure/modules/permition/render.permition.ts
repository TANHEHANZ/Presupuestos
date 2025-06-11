import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermitionGroup } from './permitions';
import { IconComponent } from '../../../precentation/shared/icons/icon.component';

@Component({
  selector: 'app-permition-viewer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="flex flex-col gap-2 justify-start">
      <div
        class="border border-gray-100 rounded-lg p-4"
        *ngFor="let grupo of permitions"
        [style.background]="getGroupBg(grupo.color, 0.05)"
      >
        <div class="flex items-center gap-2 mb-2">
          <app-icon [name]="grupo.icon" [style.color]="grupo.color"></app-icon>
          <span
            class="uppercase text-xs font-semibold"
            [style.color]="grupo.color"
          >
            {{ grupo.group }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 ml-6">
          <label
            *ngFor="let permiso of grupo.permissions"
            class="flex items-center gap-2 px-2 py-0.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
            [ngClass]="isSelected(permiso.key) ? 'text-white' : ''"
            [style.background]="isSelected(permiso.key) ? grupo.color : '#fff'"
            [style.color]="!isSelected(permiso.key) ? grupo.color : '#fff'"
          >
            <ng-container *ngIf="!readonly">
              <input
                type="checkbox"
                class="accent-current"
                [checked]="isSelected(permiso.key)"
                (change)="togglePermition(permiso.key)"
              />
            </ng-container>
            <app-icon [name]="permiso.icon" class="text-xs"></app-icon>
            <span class="text-sm">{{ permiso.name }}</span>
          </label>
        </div>
      </div>
    </div>
  `,
})
export class PermitionViewerComponent implements OnInit {
  @Input() permitions: PermitionGroup[] = [];
  @Input() readonly = false;
  @Output() selectedChange = new EventEmitter<string[]>();

  selected: string[] = [];

  ngOnInit() {
    // Si readonly, selecciona todos los permisos recibidos para visualización
    if (this.readonly) {
      this.selected = this.permitions.flatMap((grupo) =>
        grupo.permissions.map((p) => p.key)
      );
    }
  }

  isSelected(key: string): boolean {
    return this.selected.includes(key);
  }

  togglePermition(key: string) {
    if (this.readonly) return;
    if (this.isSelected(key)) {
      this.selected = this.selected.filter((k) => k !== key);
    } else {
      this.selected = [...this.selected, key];
    }
    this.selectedChange.emit(this.selected);
  }

  getGroupBg(color: string, opacity: number = 0.08): string {
    // HEX to RGBA
    const hex = color.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  }
}

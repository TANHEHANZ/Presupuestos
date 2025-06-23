import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../precentation/shared/icons/icon.component';
import { DTO_pPermitionsR } from '../../models/permitions/m_permitions';

@Component({
  selector: 'app-permition-viewer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="flex flex-col gap-2 justify-start">
      <div
        class="border border-gray-100 rounded-lg p-4"
        *ngFor="let group of permitions"
        [style.background]="getGroupBg(group.color, 0.05)"
      >
        <div class="flex items-center gap-2 mb-2">
          <app-icon [name]="group.icon" [style.color]="group.color"></app-icon>
          <span
            class="uppercase text-xs font-semibold"
            [style.color]="group.color"
          >
            {{ group.group }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2 ml-6">
          <label
            *ngFor="let permission of group.permissions"
            class="flex items-center gap-2 px-2 py-0.5 rounded-xl border border-gray-200 cursor-pointer transition-colors"
            [ngClass]="isSelected(permission.key) ? 'text-white' : ''"
            [style.background]="
              isSelected(permission.key) ? group.color : '#fff'
            "
            [style.color]="!isSelected(permission.key) ? group.color : '#fff'"
          >
            <ng-container *ngIf="!readonly">
              <input
                type="checkbox"
                class="accent-current"
                [checked]="isSelected(permission.key)"
                (change)="togglePermition(permission.key)"
              />
            </ng-container>
            <app-icon [name]="permission.icon" class="text-xs"></app-icon>
            <span class="text-sm">{{ permission.name }}</span>
          </label>
        </div>
      </div>
    </div>
  `,
})
export class PermitionViewerComponent implements OnInit {
  @Input() permitions: DTO_pPermitionsR = [];
  @Input() readonly = false;
  @Input() initialSelected: string[] = [];
  @Output() selectedChange = new EventEmitter<string[]>();

  selected: string[] = [];

  ngOnInit() {
    console.log(this.permitions);
    if (this.readonly) {
      this.selected = this.getAllPermissionKeys();
    } else if (this.initialSelected) {
      this.selected = [...this.initialSelected];
    }
  }

  private getAllPermissionKeys(): string[] {
    return this.permitions.flatMap((group) =>
      group.permissions.map((permission) => permission.key)
    );
  }

  isSelected(key: string): boolean {
    return this.selected.includes(key);
  }

  togglePermition(key: string) {
    if (this.readonly) return;

    this.selected = this.isSelected(key)
      ? this.selected.filter((k) => k !== key)
      : [...this.selected, key];

    this.selectedChange.emit(this.selected);
  }

  getGroupBg(color: string, opacity: number = 0.08): string {
    if (!color) return `rgba(0,0,0,${opacity})`;

    // HEX to RGBA
    const hex = color.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  }
}

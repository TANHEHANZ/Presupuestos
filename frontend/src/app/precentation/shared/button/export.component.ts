import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomButtonComponent } from './button.component';

export type TypeExport = 'csv' | 'pdf';

@Component({
  selector: 'app-export-button',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="flex items-start gap-2 flex-col">
      <p class="text-xs uppercase">Exportar:</p>
      <div class=" flex gap-2">
        <ng-container *ngFor="let t of types" class="">
          <app-custom-button
            [icon]="t"
            (click)="export(t)"
            [variant]="'olther'"
          />
        </ng-container>
      </div>
    </div>
  `,
})
export class ExportButtonComponent<T> {
  @Input() data: T[] = [];
  @Input() filename = 'exported-data';
  @Input() types: TypeExport[] = [];

  export(type: TypeExport) {
    console.log(`Exportando como ${type}`, this.data, this.filename);
  }
}

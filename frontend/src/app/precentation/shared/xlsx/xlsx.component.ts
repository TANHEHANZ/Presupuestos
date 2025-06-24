import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excel-renderer',
  standalone: true,
  template: `
    <table *ngIf="data?.length" border="1" class="table-auto">
      <thead>
        <tr>
          <th *ngFor="let header of headers">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let cell of row">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  `,
  imports: [CommonModule],
})
export class ExcelRendererComponent {
  @Input() headers: string[] = [];
  @Input() data: any[][] = [];
}

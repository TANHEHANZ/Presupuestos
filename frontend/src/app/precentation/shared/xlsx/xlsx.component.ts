import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excel-renderer',
  standalone: true,
  template: `
    <section class="rounded-lg overflow-y-auto border h-[35dvh] max-h-[60dvh]">
      <table *ngIf="data?.length" border="1" class="w-full border-collapse">
        <thead class="bg-slate-200 sticky top-0">
          <tr>
            <th
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-l"
              *ngFor="let header of headers"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class=" hover:bg-slate-50" *ngFor="let row of data">
            <td
              class="px-2 py-4  text-sm max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
              *ngFor="let cell of row"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  imports: [CommonModule],
})
export class ExcelRendererComponent {
  @Input() headers: string[] = [];
  @Input() data: any[][] = [];
}

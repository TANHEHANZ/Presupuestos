import {
  Component,
  ElementRef,
  Input,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import gsap from 'gsap';
export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  cellTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <section
      class="h-full  overflow-y-auto relative rounded-md overflow-hidden w-full"
    >
      <table class="min-w-full divide-y divide-gray-200 ">
        <thead class="bg-slate-100 sticky top-0">
          <tr>
            <th
              *ngFor="let col of columns"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ col.header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <ng-container *ngFor="let row of data; let i = index">
            <tr
              (click)="toggleExpand(i)"
              class="cursor-pointer hover:bg-slate-50"
            >
              <td
                *ngFor="let col of columns"
                class="px-6 py-4 whitespace-nowrap text-sm max-w-[200px] overflow-hidden  text-ellipsis "
              >
                <ng-container *ngIf="!col.cellTemplate; else customCell">
                  {{ row[col.accessor] }}
                </ng-container>
                <ng-template #customCell>
                  <ng-container
                    *ngTemplateOutlet="
                      col.cellTemplate ?? null;
                      context: { $implicit: row }
                    "
                  ></ng-container>
                </ng-template>
              </td>
            </tr>
            <tr *ngIf="expandedRowIndex === i">
              <td [attr.colspan]="columns.length" class="bg-gray-50 px-6 py-4 ">
                <div
                  #expandRow
                  style="overflow: hidden; height: 0; opacity: 0;"
                >
                  <ng-container
                    *ngTemplateOutlet="
                      rowExpandTemplate ?? null;
                      context: { $implicit: row }
                    "
                  ></ng-container>
                </div>
              </td>
            </tr>
          </ng-container>

          <tr *ngIf="data.length === 0">
            <td
              [attr.colspan]="columns.length"
              class="h-[40dvh] text-center text-gray-500 p-0"
            >
              <div
                class="flex justify-start items-center flex-col h-[40dvh] w-full"
              >
                <img
                  src="assets/lampara.png"
                  alt="lampara de no datos"
                  class="h-48"
                />
                <p class="text-xl">No hay datos para mostrar</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
})
export class TableComponent<T extends object> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() rowExpandTemplate?: TemplateRef<any>;

  expandedRowIndex: number | null = null;

  @ViewChildren('expandRow') expandRows!: QueryList<ElementRef<HTMLDivElement>>;
  toggleExpand(i: number) {
    this.expandedRowIndex = this.expandedRowIndex === i ? null : i;
    setTimeout(() => {
      const expandRow = this.expandRows.last;
      if (expandRow) {
        gsap.to(expandRow.nativeElement, {
          height: 'auto',
          opacity: 1,
          duration: 0.35,
          ease: 'linear',
        });
      }
    });
  }
}

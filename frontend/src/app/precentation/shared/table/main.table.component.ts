import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnInit,
  HostListener,
} from '@angular/core';
import { SearchComponent } from '../search/serach.component';
import { TableComponent, TableColumn } from './table.component';
import { CommonModule } from '@angular/common';
import { IconName } from '../../../infraestructure/modules/presupuesto/types';
import { ExportButtonComponent, TypeExport } from '../button/export.component';
import { ContainerComponent } from '../container/container.component';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-main-table',
  template: `
    <app-container [title]="title">
      <article class="grid grid-cols-2 my-4">
        @if (searchConfig && searchConfig) {
        <app-search
          class="w-[70%]"
          [label]="searchConfig.label ?? ''"
          [placeholder]="searchConfig.placeholder ?? ''"
          [buttonLabel]="searchConfig.buttonLabel ?? ''"
          [icon]="searchConfig.icon ?? 'search'"
          (searchChange)="searchChange.emit($event)"
        ></app-search>
        }
        <section class=" flex gap-2 justify-center items-end">
          <app-export-button
            *ngIf="export"
            [data]="export.data"
            [types]="export.types"
            class="self-end ml-auto"
          />

          <div class="relative">
            <div
              class="border border-primary h-14 flex justify-center items-center px-4 rounded-lg gap-2 text-gray-500 cursor-pointer select-none"
              (click)="toggleLimitDropdown()"
            >
              {{ currentLimit }} filas
              <app-icon
                [name]="'down'"
                class="duration-300 transition-all"
                [ngClass]="{ 'rotate-180': isLimitDropdownOpen }"
              ></app-icon>
            </div>

            <div
              *ngIf="isLimitDropdownOpen"
              class="absolute left-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
              <div
                *ngFor="let option of limitOptions"
                (click)="selectLimit(option)"
                class="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
              >
                {{ option }} filas
              </div>
            </div>
          </div>
        </section>
      </article>

      <app-table
        [columns]="columns"
        [data]="data"
        [rowExpandTemplate]="rowExpandTemplate"
      ></app-table>

      <nav class="flex justify-end gap-4 mt-4 items-center relative">
        <span>Página {{ currentPage }} de {{ totalPages }}</span>

        <button
          class="bg-primary text-white w-12 h-12 rounded-xl"
          (click)="changePage(currentPage - 1)"
          [disabled]="currentPage === 1"
        >
          <app-icon [name]="'left'"></app-icon>
        </button>

        <button
          *ngFor="let page of pages"
          class="w-12 h-12 rounded-xl border"
          [ngClass]="{
            'bg-primary text-white border-primary': page === currentPage,
            'bg-slate-50 border-gray-200': page !== currentPage
          }"
          (click)="changePage(page)"
        >
          {{ page }}
        </button>

        <button
          class="bg-primary text-white w-12 h-12 rounded-xl"
          (click)="changePage(currentPage + 1)"
          [disabled]="currentPage === totalPages"
        >
          <app-icon [name]="'right'"></app-icon>
        </button>
      </nav>
    </app-container>
  `,
  imports: [
    SearchComponent,
    TableComponent,
    CommonModule,
    ExportButtonComponent,
    ContainerComponent,
    IconComponent,
  ],
  standalone: true,
})
export class MainTableComponent<T> implements OnInit {
  @Input() columns: TableColumn<any>[] = [];
  @Input() data: T[] = [];
  @Input() rowExpandTemplate?: TemplateRef<any>;
  @Input() searchConfig?: {
    label?: string;
    placeholder?: string;
    buttonLabel?: string;
    icon?: IconName;
  };
  @Input() export?: {
    types: TypeExport[];
    data: T[];
  };
  @Input() title: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() limitChange = new EventEmitter<number>();

  @Input() fetchPageData!: (
    page: number
  ) => Promise<{ data: T[]; totalPages: number }>;

  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  @Input() currentLimit: number = 10;
  isLimitDropdownOpen = false;
  limitOptions = [8, 15, 20, 50];

  ngOnInit(): void {
    console.log('data', this.data);
    console.log('columns', this.columns);
    this.changePage(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;

    this.fetchPageData(page).then((res) => {
      this.data = res.data;
      this.totalPages = res.totalPages;
      this.updatePages();
    });
  }

  updatePages() {
    const visiblePages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(this.totalPages, start + visiblePages - 1);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  toggleLimitDropdown() {
    this.isLimitDropdownOpen = !this.isLimitDropdownOpen;
  }

  selectLimit(limit: number) {
    this.currentLimit = limit;
    this.limitChange.emit(limit);
    this.isLimitDropdownOpen = false;
    this.changePage(1); // reset to page 1 on limit change
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isLimitDropdownOpen = false;
    }
  }
}

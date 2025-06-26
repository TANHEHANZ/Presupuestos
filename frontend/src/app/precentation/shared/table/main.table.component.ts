import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { SearchComponent } from '../search/serach.component';
import { TableComponent, TableColumn } from './table.component';
import { CommonModule } from '@angular/common';
import { IconName } from '../../../infraestructure/modules/presupuesto/types';
import { ExportButtonComponent, TypeExport } from '../button/export.component';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-main-table',
  template: `
    <app-container [title]="title">
      <article class=" grid grid-cols-2 my-4  ">
        @if(searchConfig && searchConfig){
        <app-search
          class="w-[70%]"
          [label]="searchConfig.label ?? ''"
          [placeholder]="searchConfig.placeholder ?? ''"
          [buttonLabel]="searchConfig.buttonLabel ?? ''"
          [icon]="searchConfig.icon ?? 'search'"
          (searchChange)="searchChange.emit($event)"
        ></app-search>
        } @if(export){
        <app-export-button
          *ngIf="export"
          [data]="export.data"
          [types]="export.types"
          class="self-end ml-auto"
        />
        }
      </article>
      <app-table
        [columns]="columns"
        [data]="data"
        [rowExpandTemplate]="rowExpandTemplate"
      ></app-table>
    </app-container>
  `,
  imports: [
    SearchComponent,
    TableComponent,
    CommonModule,
    ExportButtonComponent,
    ContainerComponent,
  ],
  standalone: true,
})
export class MainTableComponent<T> {
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
}

import { Component } from '@angular/core';
import { UploadComponent } from '../../../../shared/upload/upload.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule, UploadComponent, CustomButtonComponent],
  template: `
    <div class="w-full h-[50dvh] flex flex-col gap-4">
      <div class="rounded-lg overflow-hidden">
        <p class="text-sm text-gray-500">
          Recuerda que el archivo que subes debe estar con el siguiente
          encabezado:
        </p>
        <table class="w-full border-collapse">
          <thead class="bg-slate-100">
            <tr>
              <th
                *ngFor="let col of columns"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-l"
              >
                {{ col.header }}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div class="h-[250px] ">
        <app-upload
          [accept]="[
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ]"
          [maxFiles]="1"
          (filesSelected)="handleFiles($event)"
        ></app-upload>
      </div>
      <div
        *ngIf="selectedFiles.length > 0"
        class=" border-olther/30 rounded-lg p-4 bg-olther/5 flex items-center  gap-2 justify-between "
      >
        <div>
          <p class="text-sm  text-olther font-bold ">Archivo seleccionado:</p>
          <ul>
            <li
              *ngFor="let file of selectedFiles"
              class="text-xs text-gray-600"
            >
              {{ file.name }} ({{ file.size | number }} bytes)
            </li>
          </ul>
        </div>
        <app-custom-button
          [icon]="'delete'"
          variant="olther"
          (btnClick)="clear()"
        ></app-custom-button>
      </div>
      @if(selectedFiles.length > 0){

      <app-custom-button
        [icon]="'check-circle'"
        class="self-end"
        (btnClick)="revisar()"
      >
        Revisar formato
      </app-custom-button>
      }
    </div>
  `,
})
export class UploadExcelComponent {
  columns = [
    { header: 'DA', minWidth: 80 },
    { header: 'UE', minWidth: 80 },
    { header: 'Cat. Prg.', minWidth: 100 },
    { header: 'FTE', minWidth: 80 },
    { header: 'Org.', minWidth: 80 },
    { header: 'Objeto', minWidth: 100 },
    { header: 'Descripcion Objeto Del Gasto', minWidth: 200 },
    { header: 'Presup. Vig.', minWidth: 100 },
    { header: 'Devengado', minWidth: 100 },
    { header: 'Porcen.', minWidth: 80 },
  ];

  selectedFiles: File[] = [];
  clear() {
    this.selectedFiles = [];
  }
  handleFiles(files: File[]) {
    console.log('Archivos válidos recibidos:', files);
    this.selectedFiles = files;
  }
  revisar() {}
}

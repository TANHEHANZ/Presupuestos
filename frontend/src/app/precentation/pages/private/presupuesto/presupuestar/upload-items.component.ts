import { Component, inject } from '@angular/core';
import { UploadComponent } from '../../../../shared/upload/upload.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../../shared/button/button.component';
import * as XLSX from 'xlsx';
import { ExcelRendererComponent } from '../../../../shared/xlsx/xlsx.component';
import { ToastService } from '../../../../../infraestructure/lib/toast/toast.service';
@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [
    CommonModule,
    UploadComponent,
    CustomButtonComponent,
    ExcelRendererComponent,
  ],
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

      <ng-container *ngIf="!isReview; else reviewMode">
        <div class="h-[250px]">
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
          class="border-olther/30 rounded-lg p-4 bg-olther/5 flex items-center gap-2 justify-between"
        >
          <div>
            <p class="text-sm text-olther font-bold">Archivo seleccionado:</p>
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
      </ng-container>

      <ng-template #reviewMode>
        <div class="" *ngIf="excelHeaders.length && excelData.length">
          <app-excel-renderer
            [headers]="excelHeaders"
            [data]="excelData"
          ></app-excel-renderer>
        </div>
      </ng-template>
      <section class="flex gap-4 self-end">
        <app-custom-button
          *ngIf="selectedFiles.length > 0"
          [icon]="isReview ? 'return' : 'check-circle'"
          (btnClick)="revisar()"
        >
          {{ isReview ? 'volver' : 'Revisar formato' }}
        </app-custom-button>
        <app-custom-button
          *ngIf="selectedFiles.length > 0 && isReview"
          [icon]="'save'"
          (btnClick)="send()"
        >
          Subir al sisitema
        </app-custom-button>
      </section>
    </div>
  `,
})
export class UploadExcelComponent {
  toastS = inject(ToastService);
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
  excelHeaders: string[] = [];
  excelData: any[][] = [];
  isReview = false;
  clear() {
    this.selectedFiles = [];
  }

  handleFiles(files: File[]) {
    this.selectedFiles = files;

    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const wb = XLSX.read(arrayBuffer, { type: 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (data.length > 0) {
        this.excelHeaders = data[0].map((cell) => String(cell));
      } else {
        this.excelHeaders = [];
      }
      this.excelData = data.slice(1);
    };

    reader.readAsArrayBuffer(file);
  }

  revisar() {
    this.isReview = !this.isReview;
  }
  send() {
    const fileToUpload = this.selectedFiles[0];
    if (!fileToUpload) {
      console.error('No hay archivo para subir');
      return;
    }
    this.toastS.addToast({
      title: 'Subir al sistema',
      type: 'warning',
      description:
        '¿Estás seguro de subir este documento como presupuesto a la unidad ejecutora de este mes?',
      action: {
        label: 'Sí, guardar',
        callback: () => {
          console.log(fileToUpload);
          const formData = new FormData();
          formData.append('file', fileToUpload);
          this.selectedFiles = [];
          this.excelHeaders = [];
          this.excelData = [];
          this.isReview = false;
        },
      },
      cancelAction: {
        label: 'Cancelar',
        callback: () => console.log('Eliminación cancelada'),
      },
    });
  }
}

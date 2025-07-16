import { Component, inject } from '@angular/core';
import { UploadComponent } from '../../../shared/upload/upload.component';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/button/button.component';
import * as XLSX from 'xlsx';
import { ExcelRendererComponent } from '../../../shared/xlsx/xlsx.component';
import { ToastService } from '../../../../infraestructure/lib/toast/toast.service';
import { PresupuestoService } from '../../../../infraestructure/services/apis/presupuesto.service';
import { PanelService } from '../../../../infraestructure/services/components/panel.service';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

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
    <div class="w-full h-auto flex flex-col gap-4 overflow-hidden">
      <div
        class="rounded-xl overflow-hidden text-violet-600 bg-violet-50  px-4 py-2"
      >
        <p class="text-sm  mb-1 ">
          Recuerda que el archivo que subes debe estar con el siguiente
          encabezado:
        </p>
        <div class="bg-white rounded-2xl  overflow-hidden border ">
          <table class="w-full border-collapse  border-white">
            <thead class="">
              <tr>
                <th
                  *ngFor="let col of columns"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-widest border-l"
                >
                  {{ col.header }}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <ng-container *ngIf="!isReview; else reviewMode">
        <div class=" transition-all duration-300">
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
          #container
          *ngIf="selectedFiles.length > 0"
          class=" absolute bottom-8 left-1/2   bg-white -translate-x-1/2 translate-y-full rounded-2xl p-4 flex flex-col items-center justify-between flex-wrap w-auto border border-gray-300 mx-auto gap-4 "
        >
          <div
            *ngFor="let file of selectedFiles"
            class=" flex gap-2 justify-center items-center"
          >
            <img
              src="assets/excel.png"
              alt="icono de hoja excel"
              class=" w-10 h-10 "
            />
            <div class="text-primary">
              {{ file.name }}
              <p class="text-gray-400 text-xs">
                ({{ file.size | number }} bytes)
              </p>
            </div>
            <p class="text-xs text-gray-600"></p>
          </div>
          <div class="flex justify-center gap-2 w-full">
            <app-custom-button
              [icon]="'delete'"
              variant="olther"
              (btnClick)="clear()"
              >Eliminar</app-custom-button
            >
            <app-custom-button [icon]="'eye'" (btnClick)="revisar()">
              Revisar Documento</app-custom-button
            >
          </div>
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
          *ngIf="selectedFiles.length > 0 && isReview"
          [icon]="'return'"
          variant="secondary"
          (btnClick)="volver()"
        >
          Volver
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
  modalS = inject(PanelService);
  uploadS = inject(PresupuestoService);

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

  @ViewChild('container') containerRef!: ElementRef;
  private animated = false;

  selectedFiles: File[] = [];
  excelHeaders: string[] = [];
  excelData: any[][] = [];
  isReview = false;

  ngAfterViewChecked(): void {
    if (this.selectedFiles.length > 0 && this.containerRef && !this.animated) {
      this.animated = true;
      gsap.fromTo(
        this.containerRef.nativeElement,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (this.selectedFiles.length === 0) {
      this.animated = false;
    }
  }

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

      this.excelHeaders =
        data.length > 0 ? data[0].map((cell) => String(cell)) : [];
      this.excelData = data.slice(1);
    };

    reader.readAsArrayBuffer(file);
  }

  revisar() {
    this.isReview = !this.isReview;
  }
  volver() {
    this.isReview = !this.isReview;
    this.selectedFiles = [];
  }
  send() {
    const fileToUpload = this.selectedFiles[0];
    if (!fileToUpload) return;

    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.sendForm(formData);
  }

  sendForm = async (formData: any) => {
    this.uploadS.upload(formData).subscribe({
      next: () => {
        this.toastS.addToast({
          title: 'Éxito',
          type: 'success',
          description: 'Archivo subido correctamente',
        });
        this.modalS.closeModal(true);
        this.selectedFiles = [];
        this.excelHeaders = [];
        this.excelData = [];
        this.isReview = false;
      },
      error: (e) => {
        const message =
          e?.error?.errors?.message || e?.error?.message || 'Error desconocido';
        this.toastS.addToast({
          title: 'Error',
          type: 'error',
          description: message,
        });
      },
    });
  };
}

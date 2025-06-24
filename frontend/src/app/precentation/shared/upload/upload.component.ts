import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icons/icon.component';
import { ToastService } from '../../../infraestructure/lib/toast/toast.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section
      class="border-2 border-dashed flex-1 h-full w-full flex justify-center items-center flex-col rounded-md p-4 transition-all duration-75 ease-out"
      (click)="fileInput.click()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      [class.bg-blue-300]="dragging"
      [class.border-red-500]="hasError"
      [class.border-blue-500]="!hasError && dragging"
    >
      <app-icon [name]="'upload'" [size]="'5x'" />
      <p class="text-gray-600">Haz clic o arrastra archivos aquí</p>
      <input
        type="file"
        #fileInput
        class="hidden"
        (change)="onFileSelected($event)"
        multiple
      />
    </section>
  `,
})
export class UploadComponent {
  @Input() accept: string[] = [];
  @Input() maxFiles: number | null = null;
  @Output() filesSelected = new EventEmitter<File[]>();
  toastS = inject(ToastService);

  dragging = false;
  hasError = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files);
      input.value = '';
    }
  }

  private processFiles(fileList: FileList) {
    let files = Array.from(fileList);
    let invalidFiles = false;

    if (this.accept.length > 0) {
      const validFiles = files.filter((file) =>
        this.accept.includes(file.type)
      );
      invalidFiles = validFiles.length !== files.length;
      files = validFiles;
    }

    if (invalidFiles) {
      this.showError('Algunos archivos no tienen un tipo permitido');
    }

    if (this.maxFiles !== null) {
      files = files.slice(0, this.maxFiles);
    }

    this.filesSelected.emit(files);
  }

  private showError(message: string) {
    this.hasError = true;
    this.toastS.addToast({
      title: 'Error al subir el archivo',
      description: message,
      type: 'error',
      id: 'error-upload',
    });
    setTimeout(() => {
      this.hasError = false;
    }, 3000);
  }
}

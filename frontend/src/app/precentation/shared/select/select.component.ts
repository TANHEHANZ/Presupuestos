import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex flex-col w-full px-1 text-sm relative">
      <label
        [for]="id"
        class="ml-2 mb-1 font-semibold text-sm"
        [ngClass]="{
          'text-red-500': isInvalid,
          'text-olther/50 opacity-65': disabled,
          'text-primary': !disabled
        }"
      >
        {{ label }}
      </label>

      <div class="relative">
        <input
          type="text"
          [placeholder]="placeholder || 'Buscar...'"
          class="border rounded-xl px-3 py-3.5 mb-1 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
          (input)="onSearch($event)"
          (focus)="openDropdown()"
          [disabled]="disabled"
          [value]="selectedItem?.label || ''"
        />

        <div
          *ngIf="isOpen"
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
        >
          <div
            *ngFor="let item of filteredItems"
            class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            (click)="selectItem(item)"
            [ngClass]="{ 'bg-primary/10': item.value === value }"
          >
            {{ item.label }}
          </div>
          <div
            *ngIf="filteredItems.length === 0"
            class="px-3 py-2 text-gray-500"
          >
            No se encontraron resultados
          </div>
        </div>
      </div>

      <ng-content></ng-content>
    </div>
  `,
})
export class CustomSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() label = '';
  @Input() id = '';
  @Input() disabled = false;
  @Input() items: { label: string; value: string }[] = [];
  @Input() placeholder = '';

  value: string = '';
  isInvalid = false;
  isOpen = false;
  selectedItem: { label: string; value: string } | null = null;
  filteredItems: { label: string; value: string }[] = [];

  onChange = (value: any) => {};
  onTouched = () => {};

  // 🔑 Detecta cambios dinámicos en los inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = [...this.items];
      if (this.value) {
        this.selectedItem =
          this.items.find((i) => i.value === this.value) || null;
      }
    }
  }

  writeValue(value: any): void {
    this.value = value ?? '';
    this.selectedItem = this.items.find((i) => i.value === this.value) || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
    this.isOpen = true;
  }

  selectItem(item: { label: string; value: string }) {
    this.value = item.value;
    this.selectedItem = item;
    this.onChange(this.value);
    this.onTouched(); // ✅ Marca el control como tocado
    this.isOpen = false;
  }

  openDropdown() {
    if (!this.disabled) {
      this.isOpen = true;
      this.filteredItems = [...this.items];
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isOpen = false;
      this.onTouched(); // ✅ Marca como tocado si se hace click fuera
    }
  }
}

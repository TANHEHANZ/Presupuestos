import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  template: `
    <div class="flex flex-col w-full px-1 text-sm">
      <label
        [for]="id"
        class="ml-2 mb-1 font-semibold text-sm"
        [ngClass]="{
          'text-red-500': isInvalid,
          ' text-olther/50  opacity-65 ': disabled,
          ' text-primary ': !disabled
        }"
        >{{ label }}</label
      >
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        class="border   rounded-xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition w-full"
        [ngClass]="{
          'border-red-500': isInvalid,
          'bg-white border-olther/50  border-dashed opacity-80 cursor-not-allowed':
            disabled,
          'border-primary': !disabled
        }"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [disabled]="disabled"
      />
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' | 'search' = 'text';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() autocomplete = 'off';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  isInvalid = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
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
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}

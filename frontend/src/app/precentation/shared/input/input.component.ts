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
    <div class="flex flex-col w-full">
      <label [for]="id" class="ml-2 mb-1 font-semibold text-primary">{{
        label
      }}</label>
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [autocomplete]="autocomplete"
        class="border border-primary rounded-xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
        [ngClass]="{ 'border-red-500': isInvalid }"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
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
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() id = '';
  @Input() autocomplete = 'off';

  value = '';
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
  setDisabledState?(isDisabled: boolean): void {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconComponent } from '../icons/icon.component';
import { CustomButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-custom-input',
  template: `
    <div class="flex flex-col w-full px-1 text-sm">
      <label
        [for]="id"
        class="ml-2 mb-1 font-semibold text-sm"
        [ngClass]="{
          'text-red-500': isInvalid,
          ' text-olther  opacity-70 ': disabled,
          ' text-primary ': !disabled
        }"
        >{{ label }}</label
      >
      <div class=" flex gap-2">
        <input
          #inputRef
          [id]="id"
          [type]="inputType"
          [placeholder]="placeholder"
          [autocomplete]="autocomplete"
          class="border rounded-xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition w-full h-full"
          [ngClass]="{
            'border-red-500': isInvalid,
            'bg-white border-olther border-dashed opacity-70 cursor-not-allowed':
              disabled,
            'border-primary': !disabled
          }"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onTouched()"
          [disabled]="disabled"
        />
        <app-custom-button
          *ngIf="type === 'password'"
          [icon]="showPassword ? 'eye' : 'eye'"
          variant="secondary"
          (btnClick)="toggleShowPassword()"
        ></app-custom-button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CustomButtonComponent],
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
  @Input() type: HTMLInputElement['type'] = 'text';

  @Input() placeholder = '';
  @Input() id = '';
  @Input() autocomplete = 'off';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;
  isInvalid = false;
  showPassword = false;
  onChange = (value: any) => {};
  onTouched = () => {};
  get inputType(): string {
    return this.type === 'password'
      ? this.showPassword
        ? 'text'
        : 'password'
      : this.type;
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
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
  focusInput() {
    if (this.inputRef) {
      this.inputRef.nativeElement.focus();
    }
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}

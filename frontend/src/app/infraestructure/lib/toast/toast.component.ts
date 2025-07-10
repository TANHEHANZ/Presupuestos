import {
  Component,
  ElementRef,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
} from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import {
  IconComponent,
  IconName,
} from '../../../precentation/shared/icons/icon.component';

type ToastType = 'success' | 'error' | 'info' | 'update' | 'delete' | 'warning';

interface ToastAction {
  label: string;
  callback: () => void | Promise<void>;
}

interface Toast {
  id?: string;
  title: string;
  description?: string;
  type: ToastType;
  action?: ToastAction;
  cancelAction?: ToastAction;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      class="fixed bottom-[10dvh] left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2"
    >
      <div
        *ngFor="let toast of toastService.toasts$Observable | async"
        class="opacity-0 min-w-[300px] border p-2 py-4 rounded-xl dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white flex overflow-hidden relative flex-col justify-start items-start"
        #toastElement
      >
        <button
          (click)="removeToast(toast.id!, toastElement)"
          class="absolute top-2 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <app-icon name="close"></app-icon>
        </button>

        <div class="flex gap-4 justify-center items-center w-full">
          <div
            class="w-1 h-full min-h-[50px] rounded-full"
            [ngClass]="getToastColorClass(toast.type)"
          ></div>

          <app-icon
            [name]="getToastIcon(toast.type)"
            [ngClass]="getToastIconColorClass(toast.type)"
          />

          <section class="flex flex-col flex-1">
            <span class="font-medium text-gray-800 dark:text-white">
              {{ toast.title }}
            </span>
            <span
              class="text-xs text-gray-600 dark:text-gray-300 text-balance mr-8"
            >
              {{ toast.description }}
            </span>
          </section>
        </div>

        <section
          *ngIf="toast.action || toast.cancelAction"
          class="flex gap-2 justify-center items-center w-full mt-2"
        >
          <button
            *ngIf="toast.cancelAction"
            class="flex-1 rounded-lg py-2 text-sm border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            (click)="handleCancelAction(toast, toastElement)"
          >
            {{ toast.cancelAction.label }}
          </button>
          <button
            *ngIf="toast.action"
            class="flex-1 rounded-lg py-2 text-nowrap border bg-primary text-white hover:bg-opacity-90 transition-colors"
            (click)="handleAction(toast, toastElement)"
          >
            {{ toast.action.label }}
          </button>
        </section>
      </div>
    </div>
  `,
})
export class ToastComponent implements AfterViewInit {
  @ViewChildren('toastElement', { read: ElementRef }) toastElements!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(
    public toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  getToastColorClass(type: ToastType): string {
    const classes = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      update: 'bg-blue-400',
      delete: 'bg-orange-500',
      warning: 'bg-yellow-500',
    };
    return classes[type];
  }

  getToastIconColorClass(type: ToastType): string {
    const classes = {
      success: 'text-green-500',
      error: 'text-red-500',
      info: 'text-blue-500',
      update: 'text-blue-400',
      delete: 'text-orange-500',
      warning: 'text-yellow-500',
    };
    return classes[type];
  }

  getToastIcon(type: ToastType): IconName {
    const icons: Record<ToastType, IconName> = {
      success: 'check-circle',
      error: 'close',
      info: 'info-circle',
      update: 'refresh',
      delete: 'delete',
      warning: 'warning',
    };
    return icons[type];
  }

  ngAfterViewInit() {
    this.toastElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      if (elements.length > 0) {
        const newToast = elements.last;
        this.animateNewToast(newToast.nativeElement);
      }
    });
  }

  private animateNewToast(element: HTMLElement) {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }

  async handleAction(toast: Toast, element: HTMLElement) {
    try {
      const result = toast.action?.callback();
      if (result instanceof Promise) await result;
    } finally {
      this.removeToast(toast.id!, element);
    }
  }

  handleCancelAction(toast: Toast, element: HTMLElement) {
    toast.cancelAction?.callback();
    this.removeToast(toast.id!, element);
  }

  removeToast(id: string, element: HTMLElement) {
    gsap.to(element, {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        this.toastService.removeToast(id);
        this.cdr.detectChanges();
      },
    });
  }
}

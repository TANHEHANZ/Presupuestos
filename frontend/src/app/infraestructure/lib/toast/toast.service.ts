import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Toast {
  id?: string;
  title: string;
  type: 'success' | 'error' | 'info' | 'update' | 'delete' | 'warning';
  description?: string;
  duration?: number;
  action?: {
    label: string;
    callback: () => void;
  };
  cancelAction?: {
    label: string;
    callback: () => void;
  };
  theme?: 'light' | 'dark';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  private toasts: Toast[] = [];

  get toasts$Observable() {
    return this.toasts$.asObservable();
  }

  addToast(toast: Toast) {
    const id = Math.random().toString(36).substring(2, 11);
    const newToast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
      theme: toast.theme || 'dark',
    };
    this.toasts = [...this.toasts, newToast];
    this.toasts$.next(this.toasts);

    if (toast.duration !== 0) {
      setTimeout(() => this.removeToast(id), newToast.duration);
    }
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toasts$.next(this.toasts);
  }
}

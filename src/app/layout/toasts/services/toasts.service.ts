import { Injectable, signal, WritableSignal } from '@angular/core';

import { Toast } from '../types';

@Injectable({ providedIn: 'root' })
export class ToastsService {
  readonly toasts: WritableSignal<Toast[]> = signal([]);

  show(toast: Toast) {
    this.toasts.update((toasts: Toast[]) => [...toasts, toast]);
  }

  remove(toast: Toast) {
    this.toasts.update((toasts: Toast[]) => toasts.filter((t) => t !== toast));
  }
}

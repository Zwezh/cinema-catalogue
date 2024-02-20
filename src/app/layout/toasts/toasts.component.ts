import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';

import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ToastsService } from './services';
import { Toast } from './types';

@Component({
  selector: 'cc-toasts',
  standalone: true,
  imports: [NgbToast, NgTemplateOutlet, NgClass, TranslateModule],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent {
  toasts: Signal<Toast[]>;

  #toastService = inject(ToastsService);

  constructor() {
    this.toasts = this.#toastService.toasts;
  }

  onHidden(toast: Toast): void {
    this.#toastService.remove(toast);
  }

  toastType(toast: Toast): { [key: string]: boolean } {
    return {
      'bg-success': toast.type === 'success',
      'bg-danger': toast.type === 'danger'
    };
  }
}

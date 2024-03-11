import { ChangeDetectorRef, Directive, effect, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@appServices';

@Directive({
  selector: '[ccIsAuthenticated]',
  standalone: true
})
export class IsAuthenticatedDirective {
  @Input() ccIsAuthenticated: string | TemplateRef<unknown>;

  #templateRef = inject(TemplateRef);
  #cdr = inject(ChangeDetectorRef);
  #viewContainer = inject(ViewContainerRef);
  #authService = inject(AuthService);
  constructor() {
    effect(() => {
      this.#viewContainer.clear();
      if (this.#authService.isLoggedIn()) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      } else if (!this.#authService.isLoggedIn() && this.ccIsAuthenticated) {
        this.#viewContainer.createEmbeddedView(this.ccIsAuthenticated as TemplateRef<unknown>);
      }
      this.#cdr.markForCheck();
    });
  }
}

import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@appServices';

@Directive({
  selector: '[ccIsAuthenticated]',
  standalone: true
})
export class IsAuthenticatedDirective {
  #templateRef = inject(TemplateRef);
  #viewContainer = inject(ViewContainerRef);
  #authService = inject(AuthService);
  constructor() {
    effect(() => {
      if (this.#authService.isLoggedIn()) {
        this.#viewContainer.clear();
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      }
    });
  }
}

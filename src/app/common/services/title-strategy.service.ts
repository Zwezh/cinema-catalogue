import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TitleStrategyService extends TitleStrategy {
  #title = inject(Title);
  #translateService = inject(TranslateService);
  #destroyRef = inject(DestroyRef);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title) {
      this.#translateService
        .get(title)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe((result) => {
          this.#title.setTitle(result);
        });
    }
  }
}

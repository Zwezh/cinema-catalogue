import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  size = signal(Math.ceil(window.innerWidth / 100) * 100);
  #destroyRef = inject(DestroyRef);
  constructor() {
    this.#listenForWindowResize();
  }

  #listenForWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        debounceTime(200),
        map((event: Event) => Math.floor((event.target as Window).innerWidth / 100) * 100)
      )
      .subscribe((size: number) => this.size.update(() => size));
  }
}

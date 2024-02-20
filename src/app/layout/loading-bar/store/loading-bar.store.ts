import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingBarStore {
  readonly loading: Signal<boolean>;
  #loadingCounter = signal(0);

  constructor() {
    this.loading = computed(() => !!this.#loadingCounter());
  }

  show(): void {
    this.#loadingCounter.update((value) => value + 1);
  }

  hide(): void {
    this.#loadingCounter.update((value) => (value ? value - 1 : 0));
  }
}

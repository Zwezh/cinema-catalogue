import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable()
export abstract class BaseStore<T> {
  readonly state: WritableSignal<T>;

  readonly #initState: T;

  protected constructor(initState: T) {
    this.state = signal<T>(initState);
    this.#initState = initState;
  }

  set(state: T) {
    this.state.set(state);
  }

  update(updater: (state: T) => T) {
    this.state.update(updater);
  }

  reset() {
    this.state.set(this.#initState);
  }

  select<U>(selector: (state: T) => U) {
    return computed(() => selector(this.state()));
  }

  selectFrom<T, U>(signal: Signal<T>, selector: (state: T) => U) {
    return computed(() => selector(signal()));
  }
}

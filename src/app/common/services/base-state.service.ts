import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import * as equal from 'fast-deep-equal/es6';

export abstract class BaseStateService<StateType = unknown> {
  #state: BehaviorSubject<StateType>;

  protected constructor(initialState: StateType) {
    this.#state = new BehaviorSubject<StateType>(initialState);
  }

  get state$(): Observable<StateType> {
    return this.#state.asObservable();
  }

  get state(): StateType {
    return this.#state.getValue();
  }

  select<K>(mapFn: (state: StateType) => K): Observable<K> {
    return this.state$.pipe(
      map(mapFn),
      distinctUntilChanged((a: K, b: K) => equal(a, b))
    );
  }

  setState(newState: StateType): void {
    this.#state.next(Object.freeze({ ...newState }));
  }
}

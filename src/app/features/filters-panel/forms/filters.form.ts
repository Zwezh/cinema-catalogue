import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { FiltersFormType, FiltersValueType } from '../types';

export class FiltersForm extends FormGroup<FiltersFormType> {
  override valueChanges: Observable<FiltersValueType>;

  constructor() {
    super({
      actors: new FormControl<string>(undefined),
      rating: new FormControl<number>(undefined),
      directors: new FormControl<string>(undefined),
      genres: new FormControl<string>(undefined),
      fromYear: new FormControl<number>(undefined),
      toYear: new FormControl<number>(undefined)
    });
  }

  get fromYear(): FormControl<number> {
    return this.controls.fromYear;
  }

  get toYear(): FormControl<number> {
    return this.controls.toYear;
  }

  getValue(): Partial<FiltersValueType> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(this.value).filter(([_, v]) => !!v));
  }
}

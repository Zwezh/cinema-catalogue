import { AbstractControl, FormControl } from '@angular/forms';

export type FiltersFormType = {
  [key: string]: AbstractControl<unknown, unknown>;
  actors: FormControl<string>;
  rating: FormControl<number>;
  directors: FormControl<string>;
  genres: FormControl<string>;
  fromYear: FormControl<number>;
  toYear: FormControl<number>;
};

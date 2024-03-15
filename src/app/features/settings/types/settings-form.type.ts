import { AbstractControl, FormArray, FormControl } from '@angular/forms';

export type SettingsFormType = {
  [key: string]: AbstractControl<unknown, unknown>;

  id: FormControl<string>;
  extension: FormControl<string>;
  genresForFilters: FormArray<FormControl<string>>;
  quality: FormControl<string>;
};

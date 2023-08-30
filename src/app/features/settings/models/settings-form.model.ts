import { AbstractControl, FormArray, FormControl } from '@angular/forms';

export interface SettingsFormModel {
  [key: string]: AbstractControl<unknown, unknown>;

  id: FormControl<string>;
  extension: FormControl<string>;
  genresForFilters: FormArray<FormControl<string>>;
  language: FormControl<string>;
  quality: FormControl<string>;
}

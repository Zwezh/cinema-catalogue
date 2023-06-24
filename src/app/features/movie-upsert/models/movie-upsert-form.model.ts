import { AbstractControl, FormArray, FormControl } from '@angular/forms';

export interface MovieUpsertFormModel {
  [key: string]: AbstractControl<unknown, unknown>;

  kpId: FormControl<number>;
  name: FormControl<string>;
  enName: FormControl<string>;
  year: FormControl<number>;
  description: FormControl<string>;
  rating: FormControl<number>;
  movieLength: FormControl<number>;
  ageRating: FormControl<number>;
  logoUrl: FormControl<string>;
  posterUrl: FormControl<string>;
  previewUrl: FormControl<string>;
  genres: FormControl<string>;
  countries: FormControl<string>;
  actors: FormArray<FormControl<string>>;
  similarMovies: FormControl<string>;
  sequelsAndPrequels: FormControl<string>;
  releaseYears: FormControl<string>;
  totalSeriesLength: FormControl<number>;
  seriesLength: FormControl<number>;
  isSeries: FormControl<boolean>;
}

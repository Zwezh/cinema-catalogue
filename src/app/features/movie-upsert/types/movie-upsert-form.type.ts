import { AbstractControl, FormControl } from '@angular/forms';

export type MovieUpsertFormType = {
  [key: string]: AbstractControl<unknown, unknown>;

  actors: FormControl<string>;
  addedDate: FormControl<string>;
  ageRating: FormControl<number>;
  backdropUrl: FormControl<string>;
  compactPosterUrl: FormControl<string>;
  countries: FormControl<string>;
  description: FormControl<string>;
  director: FormControl<string>;
  enName: FormControl<string>;
  extension: FormControl<string>;
  genres: FormControl<string>;
  id: FormControl<string>;
  isSeries: FormControl<boolean>;
  kpId: FormControl<number>;
  movieLength: FormControl<number>;
  name: FormControl<string>;
  posterUrl: FormControl<string>;
  quality: FormControl<string>;
  rating: FormControl<number>;
  sequelsAndPrequels: FormControl<string>;
  similarMovies: FormControl<string>;
  year: FormControl<string>;
};

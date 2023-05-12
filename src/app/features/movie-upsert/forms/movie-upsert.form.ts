import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { KinopoiskDto } from '@appDTOs';

import { MovieUpsertFormModel, MovieUpsertValueModel } from '../models';

export class MovieUpsertForm extends FormGroup<MovieUpsertFormModel> {
  override value: MovieUpsertValueModel;

  constructor() {
    super({
      kpId: new FormControl<number>(null, { nonNullable: true }),
      name: new FormControl<string>(null, { nonNullable: true }),
      enName: new FormControl<string>(null, { nonNullable: true }),
      year: new FormControl<number>(null, { nonNullable: true }),
      description: new FormControl<string>(null, { nonNullable: true }),
      rating: new FormControl<number>(null, { nonNullable: true }),
      movieLength: new FormControl<number>(null, { nonNullable: true }),
      ageRating: new FormControl<number>(null, { nonNullable: true }),
      logoUrl: new FormControl<string>(null, { nonNullable: true }),
      posterUrl: new FormControl<string>(null, { nonNullable: true }),
      previewUrl: new FormControl<string>(null, { nonNullable: true }),
      genres: new FormControl<string>(null, { nonNullable: true }),
      countries: new FormControl<string>(null, { nonNullable: true }),
      actors: new FormArray<FormControl<string>>([]),
      similarMovies: new FormControl<string>(null, { nonNullable: true }),
      sequelsAndPrequels: new FormControl<string>(null, { nonNullable: true }),
      releaseYears: new FormControl<string>(null, { nonNullable: true }),
      totalSeriesLength: new FormControl<number>(null, { nonNullable: true }),
      seriesLength: new FormControl<number>(null, { nonNullable: true }),
      isSeries: new FormControl<boolean>(null, { nonNullable: true })
    });
  }

  setValuesFromKinopoisk(value?: KinopoiskDto): void {
    this.setValue({
      kpId: value.id,
      name: value.name,
      enName: value.enName,
      year: value.year,
      description: value.description,
      rating: value.rating.kp,
      movieLength: value.movieLength,
      ageRating: value.ageRating,
      logoUrl: value.logo.url,
      posterUrl: value.poster.url,
      previewUrl: value.poster.previewUrl,
      genres: value.genres.join(),
      countries: value.countries.join(),
      actors: this.#getActorsFromDto(value.persons),
      similarMovies: value.similarMovies.join(),
      sequelsAndPrequels: value.sequelsAndPrequels.join(),
      releaseYears: value.releaseYears.join(),
      totalSeriesLength: value.totalSeriesLength,
      seriesLength: value.seriesLength,
      isSeries: value.isSeries
    });
  }

  #getActorsFromDto(persons: string[]): string[] {
    return persons.map((person) => person);
  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KinopoiskDto, KinopoiskListItemDto, KinopoiskPersonListDto, MovieDto, SettingsDto } from '@appDTOs';

import { Observable } from 'rxjs';

import { MovieProfessionConstant } from '../constants';
import { MovieUpsertFormType, MovieUpsertValue } from '../types';

export class MovieUpsertForm extends FormGroup<MovieUpsertFormType> {
  override value: MovieUpsertValue;
  override valueChanges: Observable<MovieUpsertValue>;

  constructor() {
    super({
      actors: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      addedDate: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      ageRating: new FormControl<number>(null, { nonNullable: true }),
      backdropUrl: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      compactPosterUrl: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      countries: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      description: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      director: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      enName: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      extension: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      genres: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      id: new FormControl<string>(null, { nonNullable: true }),
      isSeries: new FormControl<boolean>(null, { nonNullable: true }),
      kpId: new FormControl<number>(null, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
        nonNullable: true
      }),
      movieLength: new FormControl<number>(null, { nonNullable: true }),
      name: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      posterUrl: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      quality: new FormControl<string>(null, { validators: Validators.required, nonNullable: true }),
      rating: new FormControl<number>(null, { validators: Validators.required, nonNullable: true }),
      sequelsAndPrequels: new FormControl<string>(null, { nonNullable: true }),
      similarMovies: new FormControl<string>(null, { nonNullable: true }),
      year: new FormControl<string>(null, { validators: Validators.required, nonNullable: true })
    });
  }

  setSettingsValues({ extension, quality }: Partial<SettingsDto>): void {
    this.patchValue({ extension, quality });
  }

  setValuesFromDB(value: Partial<MovieDto>, { extension, quality }: Partial<SettingsDto>): void {
    this.patchValue({
      actors: value?.actors?.join(', '),
      addedDate: value?.addedDate,
      ageRating: value?.ageRating,
      backdropUrl: value?.backdropUrl,
      compactPosterUrl: value?.compactPosterUrl,
      countries: value?.countries?.join(', '),
      description: value?.description,
      director: value?.director?.join(', '),
      enName: value?.enName,
      extension: value?.extension?.replace('.', '')?.toUpperCase() || extension,
      genres: value?.genres?.join(', '),
      id: value?.id,
      isSeries: value?.isSeries,
      kpId: value?.kpId,
      movieLength: value?.movieLength,
      name: value?.name,
      posterUrl: value?.posterUrl,
      quality: value?.quality || quality,
      rating: value?.rating,
      year: value?.year.toString(),
      sequelsAndPrequels: value?.sequelsAndPrequels?.join(', '),
      similarMovies: value?.similarMovies?.join(', ')
    });
  }

  setValuesFromKinopoisk(value?: KinopoiskDto): void {
    this.patchValue(
      {
        kpId: value.id,
        name: value.name,
        enName: value.alternativeName,
        year: this.#getYear(value),
        description: value.description,
        director: this.#getPersonsFromDto(value.persons, MovieProfessionConstant.DIRECTOR),
        isSeries: value.isSeries,
        rating: value.rating.kp,
        movieLength: this.#getDuration(value),
        ageRating: value.ageRating,
        posterUrl: value.poster?.previewUrl || value.poster?.url,
        backdropUrl: value.backdrop?.url || value.poster?.url,
        compactPosterUrl: value.poster?.mini || value.poster?.previewUrl,
        genres: this.#getNamesFromDto(value.genres),
        countries: this.#getNamesFromDto(value.countries),
        actors: this.#getPersonsFromDto(value.persons, MovieProfessionConstant.ACTOR),
        similarMovies: this.#getNamesFromDto(value.similarMovies),
        sequelsAndPrequels: this.#getNamesFromDto(value.sequelsAndPrequels)
      },
      { emitEvent: true }
    );
  }

  getMovieValue(): MovieDto {
    return {
      addedDate: this.value.addedDate,
      ageRating: this.value.ageRating,
      backdropUrl: this.value.backdropUrl,
      compactPosterUrl: this.value.compactPosterUrl,
      countries: this.value.countries?.split(', ') ?? [],
      description: this.value.description,
      director: this.value.director?.split(', ') ?? [],
      enName: this.value.enName,
      extension: this.value.extension,
      genres: this.value.genres?.split(', ') ?? [],
      id: this.value.id,
      isSeries: this.value.isSeries,
      kpId: this.value.kpId,
      posterUrl: this.value.posterUrl,
      name: this.value.name,
      movieLength: this.value.movieLength,
      actors: this.value.actors?.split(', ') ?? [],
      quality: this.value.quality,
      rating: this.value.rating,
      year: this.#getYearAsNumber(),
      sequelsAndPrequels: this.value.sequelsAndPrequels?.split(', ') ?? [],
      similarMovies: this.value.similarMovies?.split(', ') ?? []
    };
  }

  #getPersonsFromDto(fields: KinopoiskPersonListDto[], type: MovieProfessionConstant): string {
    return (
      fields
        ?.filter((field: KinopoiskPersonListDto) => field.enProfession === type)
        ?.map((field: KinopoiskListItemDto) => field.name)
        ?.join(', ') ?? ''
    );
  }

  #getNamesFromDto(fields: KinopoiskListItemDto[]): string {
    return fields?.map((field: KinopoiskListItemDto) => field.name)?.join(', ') ?? '';
  }

  #getYear(value: KinopoiskDto): string {
    return value.isSeries ? `${value.releaseYears[0].start},${value.releaseYears[0].end}` : value.year.toString();
  }

  #getDuration(value: KinopoiskDto): number {
    return value.isSeries ? value.seriesLength : value.movieLength;
  }

  #getYearAsNumber(): number | number[] {
    return this.value.isSeries
      ? this.value.year.split(',').map((year: string) => Number(year))
      : Number(this.value.year);
  }
}

import { MovieDto } from '@appDTOs';

import { urlsConstant } from '@appConstants';

export class MovieModel {
  readonly actors: string[];
  readonly addedDate: string;
  readonly ageRating: number;
  readonly countries: string;
  readonly description: string;
  readonly director: string;
  readonly enName: string;
  readonly extension: string;
  readonly genres: string;
  readonly id: string;
  readonly isSeries: boolean;
  readonly kpId: number;
  readonly posterUrl: string;
  readonly name: string;
  readonly movieLength: string;
  readonly quality: string;
  readonly rating: number;
  readonly year: string;
  readonly sequelsAndPrequels: string;
  readonly similarMovies: string;

  constructor(value: MovieDto) {
    this.actors = value?.actors;
    this.addedDate = value?.addedDate;
    this.ageRating = value?.ageRating;
    this.countries = value?.countries?.join(', ');
    this.description = value?.description;
    this.director = value?.director?.join(', ');
    this.enName = value?.enName;
    this.extension = value?.extension;
    this.genres = value?.genres?.join(', ');
    this.id = value?.id;
    this.isSeries = value?.isSeries;
    this.kpId = value?.kpId;
    this.posterUrl = value?.posterUrl || urlsConstant.NO_PICTURE_URL;
    this.name = value?.name;
    this.movieLength = this.#toHoursAndMinutes(value?.movieLength);
    this.quality = value?.quality;
    this.rating = value?.rating;
    this.year = value?.year;
    this.sequelsAndPrequels = value?.sequelsAndPrequels?.join(', ');
    this.similarMovies = value?.similarMovies?.join(', ');
  }

  #toHoursAndMinutes(totalMinutes: number): string {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${totalMinutes} / ${this.#padTo2Digits(hours)}:${this.#padTo2Digits(minutes)}`;
  }

  #padTo2Digits(value: number) {
    return value.toString().padStart(2, '0');
  }
}
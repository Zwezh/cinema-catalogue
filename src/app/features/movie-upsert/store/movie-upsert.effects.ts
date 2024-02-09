import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto } from '@appDTOs';
import { KinopoiskApiService, MoviesApiService } from '@appServices';

import { forkJoin, map, Observable, take, tap } from 'rxjs';

import { MovieUpsertStore } from './movie-upsert.store';

@Injectable({ providedIn: 'root' })
export class MovieUpsertEffects {
  #store = inject(MovieUpsertStore);
  #kpApiService = inject(KinopoiskApiService);
  #moviesApi = inject(MoviesApiService);
  constructor() {}

  loadDataFromKP(id: number): void {
    const getMovieDTO$ = this.#kpApiService.getMovieById(id);
    const getCoverImageUrl$ = this.#kpApiService.getMinimizedCoverURLImage(id);
    forkJoin({ kinopoiskDTO: getMovieDTO$, cover: getCoverImageUrl$ })
      .pipe(
        take(1),
        map(({ kinopoiskDTO, cover }) => {
          kinopoiskDTO.poster.mini = cover;
          return { ...kinopoiskDTO };
        })
      )
      .subscribe((kinopoiskDTO) => this.#store.update((state) => ({ ...state, kinopoiskDTO })));
  }

  loadDataDB(id: string): void {
    this.#moviesApi
      .getMovieById$(id)
      .pipe(take(1))
      .subscribe((result) => this.#store.update((state) => ({ ...state, movieDTO: result })));
  }

  updateMovie$(movie: MovieDto): Observable<void> {
    return this.#moviesApi.updateMovie$(movie).pipe(tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)));
  }

  addMovie$(movie: MovieDto): Observable<unknown> {
    return this.#moviesApi.addMovie$(movie).pipe(tap(() => sessionStorage.removeItem(storageKeysConstant.MOVIES)));
  }

  resetState(): void {
    this.#store.reset();
  }
}

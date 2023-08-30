import { inject, Injectable } from '@angular/core';
import { storageKeysConstant } from '@appConstants';
import { MovieDto, SettingsDto } from '@appDTOs';
import { SettingsApiService } from '@appServices';

import { Observable, take, tap } from 'rxjs';

import { SettingsStateService } from './settings-state.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsActionsService {
  #apiService = inject(SettingsApiService);
  #stateService = inject(SettingsStateService);

  loadData(): void {
    this.#stateService.setState({ ...this.#stateService.state, loading: true });
    this.#apiService
      .getSettings$()
      .pipe(
        take(1),
        tap((settings: SettingsDto) => sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings)))
      )
      .subscribe((result: SettingsDto) =>
        this.#stateService.setState({ ...this.#stateService.state, settings: result, loading: false })
      );
  }

  updateSettings$(settings: SettingsDto): Observable<void> {
    this.#stateService.setState({ ...this.#stateService.state, loading: true });
    return this.#apiService.updateSettings$(settings).pipe(
      tap(() => this.#stateService.setState({ ...this.#stateService.state, settings, loading: false })),
      tap(() => sessionStorage.setItem(storageKeysConstant.SETTINGS, JSON.stringify(settings)))
    );
  }

  getMovieGenresFromLocalStorage(): string[] {
    const movies = (JSON.parse(sessionStorage.getItem(storageKeysConstant.MOVIES)) as MovieDto[]) || [];
    return Array.from(new Set(movies.map((movie: MovieDto) => movie.genres).flat()));
  }
}

import { Injectable } from '@angular/core';

import { take } from 'rxjs';

import { MoviesApiService } from './movies-api.service';
import { MoviesStateService } from './movies-state.service';

import { MovieRaw } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MoviesActionsService {
  constructor(private apiService: MoviesApiService, private stateService: MoviesStateService) {}

  loadAllMovies(): void {
    this.apiService
      .getAllMovies()
      .pipe(take(1))
      .subscribe((movies: MovieRaw[]) => this.stateService.setState({ movies }));
  }
}

import { MovieModel } from '@appModels';

export interface MoviesState {
  readonly currentPage: number;
  readonly movies: MovieModel[];
  readonly pageSize: number;
}

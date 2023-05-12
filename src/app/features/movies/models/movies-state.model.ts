import { MovieRaw } from '@appModels';

export interface MoviesState {
  readonly currentPage: number;
  readonly movies: MovieRaw[];
  readonly pageSize: number;
}

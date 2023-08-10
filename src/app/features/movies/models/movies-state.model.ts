import { MovieModel } from '@appModels';

export interface MoviesState {
  readonly currentPage: number;
  readonly loading: boolean;
  readonly movies: MovieModel[];
  readonly pageSize: number;
  readonly searchValue?: string;
}

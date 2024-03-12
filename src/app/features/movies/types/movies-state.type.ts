import { MovieModel } from '@appModels';

export type MoviesState = {
  readonly currentPage: number;
  readonly totalCount: number;
  readonly loading: boolean;
  readonly movies: MovieModel[];
  readonly searchValue?: string;
};

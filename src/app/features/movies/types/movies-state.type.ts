import { SortingType } from '@app/features/actions-panel';
import { MovieModel } from '@appModels';

export type MoviesState = {
  readonly currentPage: number;
  readonly loading: boolean;
  readonly movies: MovieModel[];
  readonly pageSize: number;
  readonly sorting: SortingType;
  readonly searchValue?: string;
};

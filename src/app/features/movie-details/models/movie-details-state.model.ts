import { MovieRaw } from '@appModels';

export interface MovieDetailsState {
  readonly loading: boolean;
  readonly movie: MovieRaw;
}

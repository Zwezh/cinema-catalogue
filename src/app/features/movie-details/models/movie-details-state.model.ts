import { MovieModel } from '@appModels';

export interface MovieDetailsState {
  readonly loading: boolean;
  readonly movie: MovieModel;
}

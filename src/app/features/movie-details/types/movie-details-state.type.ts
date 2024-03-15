import { MovieModel } from '@appModels';

export type MovieDetailsState = {
  readonly loading: boolean;
  readonly movie: MovieModel;
};

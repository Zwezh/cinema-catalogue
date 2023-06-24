import { MovieDto } from '@appDTOs';

export interface MovieDetailsState {
  readonly loading: boolean;
  readonly movie: MovieDto;
}

import { KinopoiskDto, MovieDto } from '@appDTOs';

export interface MovieUpsertState {
  readonly loading: boolean;
  readonly kinopoiskDTO: KinopoiskDto | null;
  readonly movieDTO: MovieDto | null;
}

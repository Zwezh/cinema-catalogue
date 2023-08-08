import { KinopoiskDto, MovieDto } from '@appDTOs';

export interface MovieUpsertState {
  readonly kinopoiskDTO: KinopoiskDto | null;
  readonly movieDTO: MovieDto | null;
}

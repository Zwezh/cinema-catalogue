import { KinopoiskDto, MovieDto } from '@appDTOs';

export type MovieUpsertState = {
  readonly loading: boolean;
  readonly kinopoiskDTO: KinopoiskDto | null;
  readonly movieDTO: MovieDto | null;
};

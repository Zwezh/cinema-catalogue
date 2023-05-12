import { KinopoiskDto } from '@appDTOs';

export interface MovieUpsertState {
  readonly kinopoiskDTO: KinopoiskDto | null;
}

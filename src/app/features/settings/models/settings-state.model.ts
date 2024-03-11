import { SettingsDto } from '@appDTOs';

export interface SettingsState {
  settings: SettingsDto;
  movieGenres: string[];
  loading: boolean;
}

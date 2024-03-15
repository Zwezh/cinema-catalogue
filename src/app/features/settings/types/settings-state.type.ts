import { SettingsDto } from '@appDTOs';

export type SettingsState = {
  settings: SettingsDto;
  movieGenres: string[];
  loading: boolean;
};

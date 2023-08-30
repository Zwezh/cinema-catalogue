import { SettingsDto } from '@appDTOs';

export interface SettingsState {
  settings: SettingsDto;
  loading: boolean;
}

import { SettingsDto } from '@appDTOs';

export interface SettingsValueModel extends SettingsDto {
  [key: string]: unknown;
}

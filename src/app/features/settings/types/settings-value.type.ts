import { SettingsDto } from '@appDTOs';

export type SettingsValue = SettingsDto & {
  [key: string]: unknown;
};

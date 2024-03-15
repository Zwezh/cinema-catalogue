import { Language } from './language.type';

export type LanguageBarState = {
  selectedLanguage: Language | undefined;
  languages: Language[];
};

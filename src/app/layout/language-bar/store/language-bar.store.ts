import { effect, Injectable } from '@angular/core';
import { StorageKeysConstant } from '@appConstants';
import { BaseStore } from '@appStore';

import { TranslateService } from '@ngx-translate/core';

import { languageBarList } from '../constants';
import { Language, LanguageBarState } from '../types';

@Injectable({
  providedIn: 'root'
})
export class LanguageBarStore extends BaseStore<LanguageBarState> {
  constructor(translateService: TranslateService) {
    super({
      selectedLanguage: getInitializedLanguage(translateService.getBrowserLang()),
      languages: languageBarList
    });
    effect(() => {
      translateService.use(this.state().selectedLanguage.toLowerCase());
    });
  }
}

const getInitializedLanguage = (browserLanguage: string): Language => {
  const savedLanguage = localStorage.getItem(StorageKeysConstant.LANGUAGE);
  if (savedLanguage) {
    return savedLanguage as Language;
  }
  return (
    languageBarList.find((item) => browserLanguage?.toLowerCase()?.includes(item.toLowerCase())) || languageBarList[0]
  );
};

import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { StorageKeysConstant } from '@appConstants';

import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

import { Language } from './types';

import { LanguageBarStore } from './store/language-bar.store';

@Component({
  selector: 'cc-language-bar',
  standalone: true,
  imports: [NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbDropdownItem],
  templateUrl: './language-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageBarComponent {
  languageList: Signal<Language[]>;
  selectedLanguage: Signal<Language>;
  #store = inject(LanguageBarStore);
  constructor() {
    this.languageList = this.#store.select(({ languages }) => languages);
    this.selectedLanguage = this.#store.select(({ selectedLanguage }) => selectedLanguage);
  }

  onChangeLanguage(selectedLanguage: Language): void {
    this.#store.update((state) => ({ ...state, selectedLanguage }));
    localStorage.setItem(StorageKeysConstant.LANGUAGE, selectedLanguage);
  }
}

import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import { SettingsStore } from '@app/features/settings';
import { storageKeysConstant } from '@appConstants';
import { ToastsService } from '@appLayout';
import { ENVIRONMENT } from '@appTokens';

import sign from 'jwt-encode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn = signal(JSON.parse(localStorage.getItem(storageKeysConstant.AUTH)) || false);
  #settingsStore = inject(SettingsStore);
  #toastService = inject(ToastsService);
  #environment = inject(ENVIRONMENT);
  readonly #secretKey: Signal<string>;

  constructor() {
    this.#secretKey = this.#settingsStore.select(({ settings }) => settings.key);
    effect(() => {
      localStorage.setItem(storageKeysConstant.AUTH, JSON.stringify(this.isLoggedIn()));
    });
  }

  authenticate(inputKey: string): void {
    const encodedKey = this.#encodeKey(inputKey);
    if (encodedKey === this.#secretKey()) {
      this.isLoggedIn.set(true);
      this.#toastService.show({
        type: 'success',
        translateKey: 'auth.loggedInSuccessfully'
      });
    } else {
      this.#toastService.show({
        type: 'danger',
        translateKey: 'auth.loggedInFailed'
      });
    }
  }

  signOut(): void {
    this.isLoggedIn.set(false);
    this.#toastService.show({
      type: 'success',
      translateKey: 'auth.loggedOutSuccessfully'
    });
  }

  #encodeKey(key: string): string {
    return sign(this.#environment.authToken, key);
  }
}

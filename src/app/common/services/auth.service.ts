import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { StorageKeysConstant } from '@appConstants';
import { ToastsService } from '@appLayout';

import { take } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BaseApiService } from './features-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  readonly isLoggedIn: WritableSignal<boolean>;
  #toastService = inject(ToastsService);
  #httpClient = inject(HttpClient);
  #jwtHelper = inject(JwtHelperService);
  constructor() {
    super('auth');
    this.isLoggedIn = signal(this.#isAuthenticated());
  }

  authenticate(secretKey: string): void {
    this.#httpClient
      .post<{ access_token: string }>(this.url, { secretKey })
      .pipe(take(1))
      .subscribe({
        next: (response: { access_token: string }) => {
          localStorage.setItem(StorageKeysConstant.TOKEN, response.access_token);
          this.isLoggedIn.set(true);
          this.#toastService.show({ type: 'success', translateKey: 'auth.loggedInSuccessfully' });
        },
        error: () => this.#toastService.show({ type: 'danger', translateKey: 'auth.loggedInFailed' })
      });
  }

  signOut(): void {
    localStorage.removeItem(StorageKeysConstant.TOKEN);
    this.isLoggedIn.set(false);
    this.#toastService.show({ type: 'success', translateKey: 'auth.loggedOutSuccessfully' });
  }

  #isAuthenticated(): boolean {
    const token = localStorage.getItem(StorageKeysConstant.TOKEN);
    return token && !this.#jwtHelper.isTokenExpired(token);
  }
}

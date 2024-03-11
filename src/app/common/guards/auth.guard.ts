import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@appServices';

export const authGuard = (): CanMatchFn => () =>
  inject(AuthService).isLoggedIn() || inject(Router).createUrlTree(['.']);

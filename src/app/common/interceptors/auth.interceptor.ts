import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastsService } from '@app/layout';

import { catchError, throwError } from 'rxjs';

import { StorageKeysConstant } from '../constants';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = localStorage.getItem(StorageKeysConstant.TOKEN);
  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authToken)
  });
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        inject(ToastsService).show({ type: 'danger', translateKey: 'auth.tokenIsExpired' });
      }
      return throwError(() => error);
    })
  );
}

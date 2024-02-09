import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter, TitleStrategy, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { LanguagesConstant } from '@appConstants';
import { TitleStrategyService } from '@appServices';
import { ENVIRONMENT } from '@appTokens';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { APP_ROUTES } from './app-routes';

import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withViewTransitions(), withComponentInputBinding()),
    { provide: ENVIRONMENT, useValue: environment },
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseOptions))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseOptions },
    { provide: TitleStrategy, useClass: TitleStrategyService },
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: LanguagesConstant.EN,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};

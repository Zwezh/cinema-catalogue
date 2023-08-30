import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from '@app/app-routes';
import { AppComponent } from '@app/app.component';
import { LanguagesConstant } from '@appConstants';
import { ENVIRONMENT } from '@appTokens';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from './environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    AngularFireDatabaseModule,
    { provide: ENVIRONMENT, useValue: environment },
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseOptions))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseOptions },
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
});

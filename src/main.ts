/// <reference types="@angular/localize" />

import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from '@app/app-routes';
import { AppComponent } from '@app/app.component';
import { ENVIRONMENT } from '@appTokens';

import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    AngularFireDatabaseModule,
    { provide: ENVIRONMENT, useValue: environment },
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebaseOptions)),
    provideHttpClient()
  ]
});

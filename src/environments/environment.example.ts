// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@appModels';

export const environment: Environment = {
  production: false,
  firebaseOptions: {
    apiKey: 'x',
    authDomain: 'xxx.firebaseapp.com',
    projectId: 'x',
    storageBucket: 'xxx.appspot.com',
    messagingSenderId: 'x',
    appId: 'x'
  },
  kinopoiskToken: 'x',
  settingsId: 'x',
  authToken: {
    date: 'date',
    fullName: 'X x',
    admin: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

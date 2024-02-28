// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@appModels';

export const environment: Environment = {
  production: false,
  firebaseOptions: {
    apiKey: 'AIzaSyAjppsLKh3q9Kh4TaG4dhcr-4xC7eFJKbw',
    authDomain: 'cinema-catalogue.firebaseapp.com',
    projectId: 'cinema-catalogue',
    storageBucket: 'cinema-catalogue.appspot.com',
    messagingSenderId: '1063421071099',
    appId: '1:1063421071099:web:9f639e414323560be9ea5e'
  },
  // kinopoiskToken: 'T11347S-7JJMGDN-GPJT8YX-2KPCPMQ',
  kinopoiskToken: 'ZZT1GA1-PD4MPDG-MJWTJ90-G7Q3BKJ',
  settingsId: '26ADw6uTvXbZjarBWqHl'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

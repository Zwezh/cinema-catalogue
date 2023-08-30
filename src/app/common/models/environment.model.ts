import { FirebaseOptions } from 'firebase/app';

export interface Environment {
  production: boolean;
  firebaseOptions: FirebaseOptions;
  kinopoiskToken: string;
  settingsId: string;
}

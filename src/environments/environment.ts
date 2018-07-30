// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDu3hB6maXIGEPnbNdAzPs0if8x7jN-ZO8',
    authDomain: 'udemy-chat-app.firebaseapp.com',
    databaseURL: 'https://udemy-chat-app.firebaseio.com',
    projectId: 'udemy-chat-app',
    storageBucket: 'udemy-chat-app.appspot.com',
    messagingSenderId: '717390319748'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

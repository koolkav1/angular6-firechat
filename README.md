# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Section 7
Code is complete with a major bug for the messages length property. The photo does not automatically load on the edit profile page without clicking the upload button. This needs to be fixed and then I would have a fully working application.

## Updated
now with peer to peer direct messaging.

## Create a Environments folder in src/environments
include an evironments.ts file with the following code and insert your own Firebase project details:
`export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
};`

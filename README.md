# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Section 6
I could not get the code working exactly according to the tutorial so I have made a workaround.
There are some errors, feel feel to fix them.
Code is upto Lecture 33.

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

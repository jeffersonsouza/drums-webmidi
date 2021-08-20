# Web Midi Example

This code was created and presented at [Confloss](https://confloss.com.br) in Brazil.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

This code currently reads up MIDI devices and list them, once you select a device it starts to listen MIDI events.

The example was only tested with Alesis Mesh Nitro, for other drums and MIDI devices is necessary to map it accordingly.

You can also use a Virtual MIDI device, like [VMPK](https://vmpk.sourceforge.io) to emulate a MIDI Input/output.
To make it work correctly, in VMPK settings you should set the instrument as General MIDI in Behaviour Tab.

The slides of this presentation is also included in this repo.

If you have any questions, just let me know. :)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

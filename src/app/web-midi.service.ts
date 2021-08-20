import { Injectable } from '@angular/core';
import webmidi, { Input } from 'webmidi';

import { MidiDrumCodes } from './drum-codes';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WebMidiService {
  inputList: Input[] = [];
  selectedInput?: Input;

  private messageSource = new BehaviorSubject({name: '', active: false});
  played = this.messageSource.asObservable();

  public drumParts = {
    hiHat: new Audio('assets/CH.mp3'),
    kick: new Audio('assets/kick.mp3'),
    snare: new Audio('assets/snare.mp3'),
    cymbal1: new Audio('assets/cymbal1.mp3'),
  };

  init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await webmidi.enable((error) => {
        if (error) {
          reject('WebMidi could not be enabled.');
        }

        resolve();
      });
    });
  }

  getInputList(): Promise<Input[]> {
    return new Promise((resolve, reject) => {
      resolve(webmidi.inputs);
    });
  }

  listenForInputEvents(input: Input) {
    this.selectedInput = input;
    if (input) {
      input.on('midimessage', 'all', (event) => {
        // listen for input event start
        if(event.data[1] && !event.data[2]) {
          setTimeout(() => {
            switch (event.data[1]) {
              case 42:
              case 46:
                this.messageSource.next({name: 'hihat', active: false});
                break;
              case 38:
              case 40:
                this.messageSource.next({name: 'snare', active: false});
                break;
              case 36:
                this.messageSource.next({name: 'kick', active: false});
                break;
              case 49:
                this.messageSource.next({name: 'cymbal1', active: false})
                break;
            }
          }, 100)
        }

        if (event.data[2]) {
          console.log(MidiDrumCodes.get(event.data[1]));
          switch (event.data[1]) {
            case 42:
            case 46:
              this.drumParts.hiHat.load();
              this.drumParts.hiHat.play();
              this.messageSource.next({name: 'hihat', active: true})
              break;
            case 38:
            case 40:
              this.drumParts.snare.load();
              this.drumParts.snare.play();
              this.messageSource.next({name: 'snare', active: true})
              break;
            case 36:
              this.drumParts.kick.load();
              this.drumParts.kick.play();
              this.messageSource.next({name: 'kick', active: true})
              break;
            case 49:
              this.drumParts.cymbal1.load();
              this.drumParts.cymbal1.play();
              this.messageSource.next({name: 'cymbal1', active: true})
              break;

            default:
              break;
          }
        }
      });
    }
  }
}

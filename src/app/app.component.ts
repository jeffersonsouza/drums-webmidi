import {Component, NgZone, OnInit} from '@angular/core';
import { Input } from 'webmidi';

import { WebMidiService } from './web-midi.service';
import {MidiDrumCodes} from "./drum-codes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public inputs: Input[] = [];
  public input?: Input;
  public drumPartPlayed?: {name: string, active: boolean };

  constructor(public webMidiService: WebMidiService, private ngZone: NgZone) {

  }

  async ngOnInit() {
    await this.webMidiService.init();
    this.inputs = await this.webMidiService.getInputList();
    this.webMidiService.played.subscribe((played) => {
      this.ngZone.run( () => {
        console.log(played)
        this.drumPartPlayed = played;
      });
    })
  }

  selectInput(input: Input) {
    this.webMidiService.listenForInputEvents(input);
    this.input = input;
  }
}

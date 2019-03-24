import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import 'vexflow';
import {TimeSignature} from '../time-signature';

@Component({
  selector: 'app-note-length-chooser',
  templateUrl: './note-length-chooser.component.html',
  styleUrls: ['./note-length-chooser.component.css']
})
export class NoteLengthChooserComponent implements OnInit {

  @Input() duration: number;
  // @ViewChild('quarter') quarter;
  // @ViewChild('eighth') eighth;
  // @ViewChild('sixteenth') sixteenth;
  // @ViewChild('thirtysecond') thirtysecond;

  @Input() choices: number[];
  @Output() changed = new EventEmitter<number>();
  constructor() {
  }

  ngOnInit() {
    // this.drawSingleNote(this.quarter.nativeElement, 4);
    // this.drawSingleNote(this.eighth.nativeElement, 8);
    // this.drawSingleNote(this.sixteenth.nativeElement,  16);
    // this.drawSingleNote(this.thirtysecond.nativeElement, 32);
  }

  setChoice(value: number) {
    this.duration = value;
    this.changed.emit(value);
  }

  //
  // drawSingleNote(target: HTMLElement, duration: number) {
  //   let renderer = new Vex.Flow.Renderer(target, Vex.Flow.Renderer.Backends.SVG);
  //   let context = renderer.getContext();
  //   const width: number = 50;
  //   const height: number = 75;
  //   renderer.resize(width, height);
  //   let stave = new Vex.Flow.Stave(0, -10, width);
  //   let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: duration.toString(), stem_direction: 1});
  //   let voice = new Vex.Flow.Voice({num_beats: 1, beat_value: duration});
  //   voice.addTickables([note]);
  //   let formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], width);
  //   voice.draw(context, stave);
  // }

}

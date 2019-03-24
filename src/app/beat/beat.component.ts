import {Component, Input} from '@angular/core';
import {Beat} from '../beat';
import {Note} from '../note.enum';

@Component({
  selector: 'app-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.css']
})
export class BeatComponent {

  @Input() beat: Beat;

  constructor() {
  }

  onClick() {
    this.beat.note = (this.beat.note != Note.Rest ? Note.Rest : Note.Play);
  }

  onDoubleClick() {
    this.beat.note = Note.Accent;
  }

  buttonClass(): string {

    var base: string = 'btn btn-lg';
    switch (this.beat.note) {
      case Note.Rest: {
        return `${base} btn-outline-secondary`;
      }
      case Note.Play: {
        return `${base} btn-secondary`;
      }
      case Note.Accent: {
        return `${base} btn-success`;
      }
      default: {
        return `${base} btn-outline-warning`;
      }
    }
  }
}

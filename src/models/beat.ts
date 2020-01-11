import {Note} from './note.enum';

export class Beat {
    index: number;
    note: Note;

    constructor(index: number, note: Note) {
      this.index = index;
      this.note = note;
    }

    isEqualTo(other: Beat): boolean {
      return (other.index === this.index && other.note === this.note);
    }

    toggle() {
        this.note = (this.note === Note.Rest) ? Note.Play : Note.Rest;
    }
}

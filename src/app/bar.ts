import {Beat} from './beat';
import {Note} from './note.enum';

export class Bar {
  index: number;
  beats: Beat[];

  constructor(index: number, notes: number[]) {

    this.index = index;
    this.beats = [];
    notes.forEach((note, beat_index) => {
        this.beats.push(new Beat(beat_index + 1, note as Note));
    });
  }

  static blank(index: number, length: number): Bar {
    return new Bar(index, Array(length).fill(Note.Rest));
  }

  isEqualTo(other: Bar): boolean {
    if (other.length !== this.length) {
      return false;
    }
    this.beats.forEach( (beat: Beat, index: number) => {
      if (!other.beats[index].isEqualTo(beat)) {
          return false;
      }
    });
    return true;
  }

  getStaveNotes(scale: number, duration: string, key: string): Array<Vex.Flow.StaveNote> {

    const rest = new Vex.Flow.StaveNote({
      clef: 'percussion',
      keys: [key],
      duration: duration + 'r',
      stem_direction: 1 // up
    });
    let notes = new Array<Vex.Flow.StaveNote>(this.length * scale).fill(rest);

    this.beats.forEach( (beat: Beat, index: number) => {

      const note: Vex.Flow.StaveNote = new Vex.Flow.StaveNote({
        clef: 'percussion',
        keys: [key],
        duration: (beat.note === Note.Rest ? duration + 'r' : duration),
        stem_direction: 1 // up
      });
      if (beat.note === Note.Accent) {
        // add marcato articulation, positioned above the note
        note.addArticulation(0, new Vex.Flow.Articulation('a^').setPosition(Vex.Flow.Modifier.Position.ABOVE));
      }
      notes[index * scale] = note;
    });

    return notes;
  }

  get length(): number {
    return this.beats.length;
  }

  set length(value: number) {
    const diff: number = value - this.length;
    if (diff < 0) {
      this.beats = this.beats.slice(0, value);
    } else {
      for (let index: number = this.length + 1; index <= value; index++) {
        this.beats.push(new Beat(index, Note.Play));
      }
    }
  }
}
